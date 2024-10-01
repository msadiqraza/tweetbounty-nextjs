"use client";

import ConnectWallet from "@/components/Metamask/ConnectWallet";
import { Providers } from "@/Providers";
import { useRouter } from "next/navigation";

export default function Home(): JSX.Element {
	const router = useRouter();

	const handleClick = (): void => {
		router.push("/check");
	};

	return (
		<Providers>
			<div className="flex justify-center items-center">
				<div className="max-w-[1000px]">
					<ConnectWallet
						isGoBack={false}
					/>
					<div className="flex flex-col justify-center items-center gap-4 px-20 text-center min-h-[60vh]">
						<h1 className="text-5xl font-extrabold dark:text-black">
							Sky is
							Coming
						</h1>
						<h2 className="text-xl text-gray-500 dark:text-gray-400 pb-4">
							Unlock the
							next
							evolution
							of DeFi,
							decentralized,
							non-custodial
							savings
							and
							rewards
						</h2>
						<button
							onClick={
								handleClick
							}
							className=" inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
						>
							<span className=" px-10 py-3.5 text-lg transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
								Let's
								Go
							</span>
						</button>
					</div>
				</div>
			</div>
		</Providers>
	);
}
