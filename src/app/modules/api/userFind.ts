import axios from "axios";

const findUser = async (username: string, wallet: string): Promise<number> => {
	try {
		console.log("inside user find")
		
		const response = await axios.get(
			`/api/user?user=${encodeURIComponent(
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
