// routes/ethRoutes.ts

import exp from "constants";
import { ethers, parseEther } from "ethers";
import { Request, Router } from "express";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv"

dotenv.config()
const router = Router();


// Developer's private key (securely stored in environment variables)
const privateKey = process.env.PRIVATE_KEY!;
const provider = new ethers.InfuraProvider(
	"sepolia",
	process.env.INFURA_PROJECT_ID
);
const wallet = new ethers.Wallet(privateKey, provider);

router.post(
	"/send-eth",
	asyncHandler(async (req: Request, res: any) => {
		const { recipient, amount } = req.body;

		if (!recipient || !amount) {
			return res.status(400).json({
				error: "Recipient and amount are required",
			});
		}

		try {
			const amountInWei = parseEther(String(amount));
			const tx = {
				to: recipient,
				value: amountInWei.toString(),
			};

			console.log(
				"Before transaction:",
				amountInWei.toString(),
				recipient
			);
			const transaction = await wallet.sendTransaction(
				tx
			);
			console.log(
				"Transaction hash:",
				transaction.hash
			);

			res.json({ transactionHash: transaction.hash });
		} catch (error: any) {
			console.error("Error sending ETH:", error);
			res.status(500).json({
				error: "Transaction failed",
				details: error.message || error,
			});
		}
	})
);

export { wallet };
export default router;
