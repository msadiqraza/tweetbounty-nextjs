import { supabase } from "@/modules/scripts/supabase/supabaseClient";

async function insertUser(username: string, wallet: string): Promise<boolean> {
	const { data, error } = await supabase
		.from("users") // Table name
		.insert([{ username: username, wallet: wallet }]) // Data to insert
		.select();

	if (error) {
		console.log("Error inserting data:", error.message);
		return false;
	} else {
		console.log("Data inserted successfully:", data);
		return true;
	}
}

export { insertUser };
