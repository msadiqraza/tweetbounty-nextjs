import axios from "axios";

const findUser = async (username: string, wallet: string): Promise<number> => {
	try {
		const response = await axios.get(
			`http://localhost:5000/user/find?user=${encodeURIComponent(
				username
			)}&wallet=${encodeURIComponent(wallet)}`
		);

		console.log(
			"User found:",
			response.data.userFound,
			response.data.inserted
		);
		if (response.data.userFound) return 1; // User found
		else return -1; // User not found
	} catch (error) {
		console.error("Error fetching user:", error);
		return -3; // Return error code
	}
};

export default findUser;
