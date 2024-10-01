"use client";

import Home from "@/home/page";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";

function App(): JSX.Element {
	return (
		<MetaMaskUIProvider
			sdkOptions={{
				dappMetadata: {
					name: "TweetBounty",
					url:
						typeof window !==
						"undefined"
							? window
									.location
									.href
							: "",
				},
				infuraAPIKey: "https://infura.io/v3/c2277863d49b42909d1a6b452b4d2553",
			}}
		>
			<Home />
		</MetaMaskUIProvider>
	);
}

export default App;
