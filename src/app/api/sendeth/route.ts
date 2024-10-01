// app/api/sendeth/route.ts
import { NextResponse } from "next/server";
import dotenv from "dotenv";
import { ethers, parseEther } from "ethers";

dotenv.config();

const privateKey = process.env.PRIVATE_KEY!;
const provider = ethers.getDefaultProvider(
	"sepolia",
	process.env.INFURA_PROJECT_ID
);
const wallet = new ethers.Wallet(privateKey, provider);

export async function POST(req: Request) {
	try {
		const { recipient, amount } = await req.json();
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

		const transaction = await wallet.sendTransaction(tx);
		console.log("After transaction:", transaction.hash);

		return NextResponse.json({
			transactionHash: transaction.hash,
		});
	} catch (error) {
		console.error("Error sending ETH:", error);
		return NextResponse.json(
			{
				error: "Transaction failed",
				err: (error as Error).message,
			},
			{ status: 500 }
		);
	}
}
