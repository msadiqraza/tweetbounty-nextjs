// routes/tweetRoutes.ts

import { Request, Router } from "express";
import asyncHandler from "express-async-handler";
import Joi from "joi";
import { scrapeTweets, searchKeyword } from "../controllers/puppeteer";

const router = Router();

const tweetSchema = Joi.object({
	message: Joi.string().uri().optional(),
});

router.get(
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

export { tweetSchema };
export default router;
