// routes/userRoutes.ts

import { Request, Router } from "express";

import asyncHandler from "express-async-handler";

const router = Router();

router.get(
	"/",
	asyncHandler(async (req: Request, res: any) => {
		res.send({
			message: "Hello World! This is the tweetbounty server",
		});
	})
);

export default router;
