// routes/userRoutes.ts
import { Request, Router } from "express"; // Import NextFunction
import asyncHandler from "express-async-handler";
import { findUser } from "../supabase/findUser"; // Adjusted path; removed .ts
import { insertUser } from "../supabase/insertUser"; // Adjusted path; removed .ts

const router = Router();

router.get(
	"/user",
	asyncHandler(async (req: Request, res: any) => {
		console.log("inside user api");

		// Added next parameter
		const user = req.query.user as string;
		const wallet = req.query.wallet as string;

		console.log("User info", user, " & ", wallet)
		
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

export default router;
