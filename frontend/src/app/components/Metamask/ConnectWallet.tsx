"use client";

import { faLongArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAccount } from "@metamask/sdk-react-ui";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import App from "./Metamask";

interface ConnectWalletProps {
	isGoBack: boolean;
}

export default function ConnectWallet({
	isGoBack,
}: ConnectWalletProps): JSX.Element {
	const [click, setClick] = useState(false);
	const elementRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	// Add functionality: dynamic address call to get address without clicking
	const abx = useAccount();

	function formatAddress(
		address: string | undefined
	): string | undefined {
		if (!address || address.length !== 42) return address; // 0x + 40 hex characters
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	}

	const handleCopyClick = (textToCopy: string): void => {
		navigator.clipboard.writeText(textToCopy);
	};

	const handleClickOutside = (event: MouseEvent): void => {
		if (
			elementRef.current &&
			!elementRef.current.contains(event.target as Node)
		) {
			setClick(false);
		}
	};

	// Set up event listener when component mounts
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener(
				"mousedown",
				handleClickOutside
			);
		};
	}, []);

	return (
		<div className="flex flex-row justify-between">
			<div>
				{isGoBack ? (
					<button
						className="p-5 flex flex-row justify-center items-center"
						onClick={() =>
							navigate(
								"/"
							)
						}
					>
						<FontAwesomeIcon
							icon={
								faLongArrowLeft
							}
							size="2x"
							style={{
								paddingTop: "10px",
							}}
						/>{" "}
						<h2 className="text-2xl font-semibold text-black ps-2 pt-2 text-center flex justify-center items-center">
							Go Back
						</h2>
					</button>
				) : (
					<div></div>
				)}
			</div>

			{abx.address ? (
				<div className="p-5">
					<button
						onClick={() => {
							handleCopyClick(
								abx.address!
							);
							setClick(
								!click
							);
						}}
						className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
					>
						<span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-lg bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
							{formatAddress(
								abx.address
							)}
						</span>
					</button>
				</div>
			) : (
				<div className="p-5">
					<button
						onClick={() => {
							setClick(
								!click
							);
						}}
						className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
					>
						<span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-lg bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
							Connect
							Wallet
						</span>
					</button>
				</div>
			)}

			{click && (
				<div
					ref={elementRef}
					className="bg-[#F6F5F2] shadow-xl absolute top-[25vh] left-[20vw] w-[60vw] h-[50vh] flex justify-center items-center rounded-lg"
				>
					<App />
				</div>
			)}
		</div>
	);
}
