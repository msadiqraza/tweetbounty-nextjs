"use client";

import {
	faCheck,
	faCheckDouble,
	faSpinner,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useState } from "react";
import verify from "@/modules/api/tweetVerification";
import findUser from "@/modules/api/userFind";
import { useAccount } from "wagmi";

interface TwitterProps {
	isVerified: (verified: boolean) => void;
}

export default function Twitter({ isVerified }: TwitterProps): JSX.Element {
	const apiUrl = "https://sky-money.onrender.com/";

	const [isFollowing, setIsFollowing] = useState(false);
	const [isPost, setIsPost] = useState(false);
	const [url, setUrl] = useState("");

	const [userFound, setUserFound] = useState(0);
	const [xVerify, setXVerify] = useState(0);
	const [isProcessing, setIsProcessing] = useState(false);

	const twitterUrl = "https://twitter.com/intent/tweet";
	const text = `MakerDAO is now Sky! Get ready to upgrade to $USDS and $SKY on 18 Sept.
Just signed up for the Early Bird Bonus on http://Sky.Money.
Get double rewards for the first month after launch if you're eligible 
@SkyEcosystem`;
	const postHref = `${twitterUrl}?text=${encodeURIComponent(text)}`;

	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (isFollowing) handleVerify(url);
		else console.log("User is not following");
	};

	const extractUsername = (url: string): string | null => {
		const regex = /https:\/\/x\.com\/([^/]+)\/status\/\d+/;
		const match = url.match(regex);
		return match ? match[1] : null;
	};

	const handleVerify = async (url: string): Promise<void> => {
		console.log("url", url);
		setIsProcessing(true);
		const { address, isConnected } = useAccount();
		let wallet;

		if (isConnected) {
			wallet=`${address}`
		}
		else wallet = `0x`;

		const username = extractUsername(url);

		const result = await findUser(username || "", wallet);
		setUserFound(result);

		if (!result) {
			try {
				const verifyResult = await verify(
					apiUrl,
					url
				);
				console.log(
					"verifyResult",
					verifyResult
				);

				if (verifyResult) {
					setIsPost(true);
					setXVerify(1); // 1 indicates verification success
					isVerified(true);
				} else {
					console.log(
						"Verification failed"
					);
					setXVerify(-1); // -1 indicates verification failure
				}
			} catch (error) {
				console.error(
					"Error during verification:",
					error
				);
				setXVerify(-1); // -1 on error
			}
		} else {
			console.log(
				"User has already redeemed their reward"
			);
			setUserFound(-1); // -1 indicates user already found
		}
		setIsProcessing(false);
	};

	const icon = (status: number): JSX.Element => {
		switch (status) {
			case 1:
				return (
					<FontAwesomeIcon
						icon={faCheckDouble}
						className="text-2xl text-green-500 px-2"
					/>
				);
			case -1:
				return (
					<FontAwesomeIcon
						icon={faTimes}
						className="text-2xl text-red-500 px-2"
					/>
				);
			default:
				return (
					<FontAwesomeIcon
						icon={faSpinner}
						className="animate-spin text-2xl px-2"
					/>
				);
		}
	};

	return (
		<div className="bg-[#5a3ba2] m-2 p-3 text-white rounded-lg">
			<div className="flex flex-row items-center gap-3 font-semibold pb-3">
				<div className="rounded-full bg-[#2d2d52] px-[1.125rem] py-2.5">
					1
				</div>
				<h3>
					Join Sky.money, and tell the
					world about Sky
				</h3>
			</div>

			<ul className="p-4 ps-6">
				<li className="pb-2 flex flex-row">
					Follow on X:{" "}
					<a
						className="bg-[#2d2d52] px-2.5 py-1.5 rounded-xl ms-2"
						href="https://x.com/SkyEcoSystem"
						target="_blank"
						rel="noopener noreferrer"
						onClick={() =>
							setIsFollowing(
								true
							)
						}
					>
						@SkyEcoSystem
					</a>
					{isFollowing && (
						<div className="ms-2 bg-blue-600 rounded-full px-3 flex justify-center items-center">
							<FontAwesomeIcon
								icon={
									faCheck
								}
							/>
						</div>
					)}
				</li>
				<li className="pb-2 flex flex-row">
					Click Post to share the Promo
					Announcement:
					<a
						className="bg-[#2d2d52] px-2.5 py-1.5 rounded-xl ms-2"
						href={postHref}
						target="_blank"
						rel="noopener noreferrer"
					>
						Post
					</a>
					{isPost && (
						<div className="ms-2 bg-blue-600 rounded-full px-3 flex justify-center items-center">
							<FontAwesomeIcon
								icon={
									faCheck
								}
							/>
						</div>
					)}
				</li>
				<li>
					Verifying the link to your
					shared tweet:
				</li>
			</ul>

			<form
				onSubmit={handleSubmit}
				className="flex items-center bg-[#2d2d52] rounded-full p-2"
			>
				<input
					type="text"
					placeholder="Insert your post link here"
					className="bg-transparent text-[#d8d8e8] text-base flex-1 outline-none pl-4"
					value={url}
					onChange={(
						e: ChangeEvent<HTMLInputElement>
					) => setUrl(e.target.value)}
				/>
				<button
					type="submit"
					className="bg-[#6a4bc2] text-white rounded-full px-5 py-2 hover:bg-[#5a3ba2]"
				>
					Verify
				</button>
			</form>

			{isProcessing && (
				<div>
					<div className="pt-4 ps-3 flex items-center">
						{icon(userFound)}
						<label>
							Confirming
							you have
							never
							received a
							reward
							before
						</label>
					</div>

					<div className="pt-2 ps-3 flex items-center">
						{icon(xVerify)}
						<label>
							Verifying
							twitter
							post
						</label>
					</div>
				</div>
			)}
		</div>
	);
}
