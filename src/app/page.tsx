"use client";

import Home from "@/home/page";
import { Providers } from "./Providers";

function App(): JSX.Element {
	return (
		<Providers>
			<Home />
		</Providers>
	);
}

export default App;
