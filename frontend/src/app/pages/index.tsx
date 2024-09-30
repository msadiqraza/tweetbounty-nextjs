import { Route, Routes } from "react-router-dom";
import Check from "./Check";
import Home from "./Home";
import React from "react";

export default function Routing(): JSX.Element {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/Check" element={<Check />} />
		</Routes>
	);
}
