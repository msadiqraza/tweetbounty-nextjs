// app.ts

import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// import userRoutes from "./routes/userRoutes";
import ethRoutes from "./routes/ethRoutes";
import mainRoutes from "./routes/mainRoutes";
import { tweetSchema } from "./routes/tweetRoutes";

import { Request } from "express";
import asyncHandler from "express-async-handler";
import { scrapeTweets, searchKeyword } from "./controllers/puppeteer";
import { findUser } from "./supabase/findUser";
import { insertUser } from "./supabase/insertUser";
import { runMigration } from "./supabase/migrations";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Allow requests from frontend

// Use routes
app.use(
	"/user",
	asyncHandler(async (req: Request, res: any) => {
		console.log("inside user api");

		// Added next parameter
		const user = req.query.user as string;
		const wallet = req.query.wallet as string;

		console.log("User info", user, " & ", wallet);

		if (!user || !wallet) {
			return res.status(400).json({
				error: "Missing user or wallet parameter",
			});
		}

		console.log("username:", user, "wallet:", wallet);

		const userFind = await findUser(user, wallet);
		if (!userFind) {
			const insert = await insertUser(user, wallet);
			console.log("Insert successful:", insert);

			runMigration('supabase/migrations/insert_user.sql', [user, wallet])
			return res.json({
				userFound: false,
				inserted: true,
			});
		} else {
			return res.json({
				userFound: true,
				inserted: false,
			});
		}
	})
);

app.use("/", mainRoutes);

app.use(
	"/tweet",
	asyncHandler(async (req: Request, res: any) => {
		const { error } = tweetSchema.validate(req.query);

		if (error) {
			console.error(
				"Invalid input:",
				error.details[0].message
			);
			return res
				.status(400)
				.json({ error: "Invalid input URL" });
		}

		const url =
			(req.query.message as string) ||
			"https://x.com/blackstar_defi/status/1836007774893007235";

		console.log("URL from frontend:", url);

		try {
			const tweets = await scrapeTweets(url, 5);
			if (!tweets || tweets.length === 0) {
				console.warn(
					"No tweets found at the provided URL"
				);
				return res.status(404).json({
					error: "No tweets found",
				});
			}

			const keyword = "Sky";
			const foundStrings = searchKeyword(
				tweets,
				keyword
			);

			console.log(
				"Strings containing the keyword:",
				foundStrings
			);
			res.json({ verified: foundStrings });
		} catch (err: any) {
			console.error(
				"Error occurred while processing the request:",
				err.message
			);
			res.status(500).json({
				error: "An error occurred while processing your request",
				details: err.message,
			});
		}
	})
);

app.use("/send-eth", ethRoutes);

// Global error handling middleware
app.use(
	(
		err: any,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		console.error("Unhandled error:", err);
		res.status(500).json({
			error: "An unexpected error occurred",
			details: err.message || err,
		});
	}
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
