import axios from "axios";

const verify = async ( url: string): Promise<boolean | null> => {
	try {
		console.log("inside tweet endpoints")

		const response = await axios.get(
			`/api/tweet?message=${encodeURIComponent(
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
