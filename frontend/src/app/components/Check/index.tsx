"use client";

import React, { useState } from "react";
import Connect from "./ConnectYourWallet";
import Twitter from "./Twitter";

export default function Index(): JSX.Element {
	const [isVerified, setIsVerified] = useState(false);

	const handleVerify = (data: boolean): void => {
		setIsVerified(data);
		console.log("isVerified", data, isVerified);
	};

	return (
		<div className="bg-[#2d2d52] mx-3 py-3 px-2 rounded-xl">
			<Twitter isVerified={handleVerify} />
			<Connect isVerified={isVerified} />
		</div>
	);
}
