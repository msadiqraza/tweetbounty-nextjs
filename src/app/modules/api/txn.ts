import axios from "axios";

const handleSendEth = async (
	recipient: string,
	amount: number
): Promise<string | null> => {
	try {
		const response = await axios.post(
			`/api/sendeth`,
			{ recipient, amount },
			{
				headers: {
					"Content-Type":
						"application/json",
				},
			}
		);
		console.log(
			"Transaction hash:",
			response.data.transactionHash
		);
		return response.data.transactionHash; // Return the transaction hash
	} catch (error) {
		console.error("Error sending ETH:", error);
		return null; // Return null in case of error
	}
};

export default handleSendEth;
