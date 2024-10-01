"use client";

import Index from "@/components/Check";
import ConnectWallet from "@/components/Metamask/ConnectWallet";
import { Providers } from "@/Providers";

export default function Check(): JSX.Element {
	return (
		<Providers>
			<div className="flex justify-center items-center">
				<div className="pb-7 max-w-[1000px]">
					<ConnectWallet
						isGoBack={true}
					/>
					<div className="px-5 pt-5">
						<h1 className="text-4xl font-bold dark:text-black pb-3">
							Two steps
							to boosted
							SKY
							rewards
						</h1>
						<p className="text-xl text-gray-600 dark:text-gray-600 pb-4">
							Sky Token
							Rewards
							are on the
							horizon.
							To qualify
							for double
							SKY
							rewards,
							complete
							the
							following
							steps.
							When Sky
							launches,
							you’ll be
							able to
							accumulate
							boosted
							rewards by
							supplying
							USDS to
							the Sky
							Token
							Rewards
							module.
							Later,
							claim the
							rewards in
							the wallet
							you
							connect
							here.
							Terms and
							restrictions
							apply.
						</p>
					</div>
					<Index />
				</div>
			</div>
		</Providers>
	);
}
