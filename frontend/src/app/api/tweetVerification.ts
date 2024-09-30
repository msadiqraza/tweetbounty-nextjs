import axios from "axios";

const verify = async (apiUrl: string, url: string): Promise<boolean | null> => {
	try {
		console.log("api alive", apiUrl);
		const response = await axios.get(
			`${apiUrl}tweet?message=${encodeURIComponent(
				url
			)}`
		);

		const result: boolean = response.data.verified;
		console.log("tweet verification", result, response);

		return result;
	} catch (err) {
		console.error(err);
		return null; // Ensure it returns null on error
	}
};

export default verify;
