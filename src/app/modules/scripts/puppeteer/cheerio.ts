import axios from "axios";
import * as cheerio from "cheerio";

async function scrapeTweets(
	url: string,
	tweetCount: number = 5
): Promise<string[]> {
	try {
		// Fetch the HTML content of the page
		const { data } = await axios.get(url, {
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			},
		});

		// Load the HTML content into Cheerio
		const $ = cheerio.load(data);

		// Select all tweet elements
		const tweets = $('[data-testid="tweet"]');
		console.log("tweetText", tweets);
		// Collect tweet text (limiting to the provided tweet count)
		let scrapedTweets: string[] = [];
		tweets.each((index, element) => {
			if (index < tweetCount) {
				const tweetText = $(element)
					.text()
					.trim();
				scrapedTweets.push(tweetText);
			}
		});

		console.log("scrapedTweets", scrapedTweets);
		return scrapedTweets;
	} catch (error) {
		console.error("Error scraping tweets:", error);
		return [];
	}
}

// Function to search for a keyword in an array of strings
function searchKeyword(strings: string[], keyword: string): boolean {
	return strings.some((string) =>
		string.toLowerCase().includes(keyword.toLowerCase())
	);
}

export { scrapeTweets, searchKeyword };
