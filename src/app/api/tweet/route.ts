// app/api/tweet/route.ts
import { NextResponse } from "next/server";
import {
	scrapeTweets,
	searchKeyword,
} from "@/modules/scripts/puppeteer/playwright";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const url =
		searchParams.get("message") ||
		"https://x.com/blackstar_defi/status/1836007774893007235"; // Default URL

	console.log("url from frontend:", url);

	const tweets = await scrapeTweets(url, 5); // Scrape the top 5 tweets
	const keyword = "Sky";

	const foundStrings = searchKeyword(tweets, keyword);
	console.log("Strings containing the keyword:", foundStrings);

	return NextResponse.json({ verified: foundStrings });
}
