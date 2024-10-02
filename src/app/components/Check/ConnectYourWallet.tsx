"use client";

import findUser from "@/modules/api/userFind";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRef, useState } from "react";
import { useAccount } from "wagmi";

interface ConnectProps {
	isVerified: boolean;
}

export default function Connect({ isVerified }: ConnectProps): JSX.Element {
	const [click, setClick] = useState(false);
	const [processing, setProcessing] = useState(true);
	const [problem, setProblem] = useState(false);
	const elementRef = useRef<HTMLDivElement>(null);

	const { address, isConnected } = useAccount();
	let wallet;

	if (isConnected) {
		wallet = `${address}`;
	} else wallet = `0x`;

	const handleClick = async (): Promise<void> => {
		console.log("handleClick abx", address);

		const userFound = await findUser("", `${address}`);
		if (userFound) {
			console.log("work", problem);
			setProblem(true);
			setTimeout(() => {
				setProblem(false);
			}, 3000);

			return;
		}

		// const response = await handleSendEth(address, 0.01);
		setProcessing(false);
		console.log("response");
	};

	return (
		<div
			className={`${
				isVerified
					? "bg-[#5a3ba2]"
					: "bg-[#403368]"
			} m-2 p-3 text-white rounded-lg`}
		>
			<div className="flex flex-row items-center gap-3 font-semibold pb-3">
				<div className="rounded-full bg-[#2d2d52] px-[1.125rem] py-2.5">
					2
				</div>
				<h3>
					Connect your wallet and sign
					the message
				</h3>
			</div>

			<h3 className="px-3 py-3">
				Sign the message to confirm eligibility.
				Your connected wallet will qualify to
				claim double SKY rewards.
			</h3>

			<button
				onClick={() => {
					if (isVerified)
						setClick(!click);
				}}
				className="relative inline-flex items-center justify-center p-0.5 mx-2 mb-2 overflow-hidden text-white rounded-lg group hover:bg-white"
			>
				<span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-lg bg-white dark:bg-[#2d2d52] rounded-md">
					Connect Wallet
				</span>
			</button>

			{processing ? (
				click && (
					<div
						ref={elementRef}
						className="bg-[#F6F5F2] shadow-2xl rounded-lg absolute top-[40vh] left-[20vw] w-[60vw] h-[50vh] flex flex-col justify-center items-center"
					>
						<ConnectButton />
						{isConnected &&
							click && (
								<button
									onClick={
										handleClick
									}
									className="relative inline-flex items-center justify-center p-0.5 mx-2 mb-2 text-white overflow-hidden rounded-lg group hover:bg-white"
								>
									<span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-lg bg-white dark:bg-[#2d2d52] rounded-md">
										Get
										Rewards!
									</span>
								</button>
							)}
					</div>
				)
			) : (
				<div className="ps-3 text-green-500">
					Transaction Successful!
				</div>
			)}

			{problem && (
				<div className="absolute bottom-[0px] right-[10px] bg-red-800 max-w-50 rounded-md px-4 py-5">
					<label>
						You have already
						redeemed your reward
					</label>
				</div>
			)}
		</div>
	);
}
