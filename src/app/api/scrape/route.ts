import dotenv from "dotenv";
import { chromium } from "playwright";

dotenv.config();

// Function to scrape tweets from a given URL
async function scrapeTweets(
	url: string,
	tweetCount: number = 5
): Promise<string[]> {
	const browser = await chromium.launch({
		headless: true, // Run in headless mode
		args: [
			"--disable-setuid-sandbox",
			"--no-sandbox",
			"--single-process",
			"--no-zygote",
		],
		timeout: 60000,
	});

	const page = await browser.newPage();
	await page.setViewportSize({ width: 1366, height: 768 });
	await page.goto(url, { waitUntil: "networkidle", timeout: 0 });

	// Wait for the page to load
	await page.waitForTimeout(10000); // Equivalent of delay to allow dynamic content to load

	// Scroll down to load more tweets
	for (let i = 0; i < 10; i++) {
		await page.keyboard.press("PageDown");
		await page.waitForTimeout(2000); // Delay after each scroll to allow tweets to load
	}

	// Select all tweet elements using the data-testid attribute
	const tweets = await page.$$('[data-testid="tweet"]');

	// Collect tweet text (limiting to the provided tweet count)
	const scrapedTweets: string[] = [];
	for (let i = 0; i < Math.min(tweets.length, tweetCount); i++) {
		const tweetText = await tweets[i].innerText();
		scrapedTweets.push(tweetText);
	}

	await browser.close();
	return scrapedTweets;
}

// Function to search for a keyword in an array of strings
function searchKeyword(strings: string[], keyword: string): boolean {
	return strings.some((string) =>
		string.toLowerCase().includes(keyword.toLowerCase())
	);
}


export { scrapeTweets, searchKeyword };
