"use client";

import Routing from "@/pages";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";
import { BrowserRouter } from "react-router-dom";

function App(): JSX.Element {
	return (
		<MetaMaskUIProvider
			sdkOptions={{
				dappMetadata: {
					name: "Example React UI Dapp",
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
			<BrowserRouter>
				<Routing />
			</BrowserRouter>
		</MetaMaskUIProvider>
	);
}

export default App;
