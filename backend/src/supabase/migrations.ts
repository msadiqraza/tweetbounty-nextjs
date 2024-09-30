import * as fs from "fs";
import * as path from "path";
import { supabase } from "./supabaseClient";

async function runMigration(filePath: string, params: any) {
	try {
		const sql = fs.readFileSync(filePath, "utf-8");
		const { error } = await supabase.rpc("execute_migration", {
			query: sql,
			params: params,
		});

		if (error) console.error("Migration error: ", error);
		else
			console.log(
				`Migration applied successfully from ${filePath}`
			);
	} catch (err) {
		console.error("Error reading Migration file:", err);
	}
}

async function runAllMigrations(username: string, wallet: string) {
	const migrationsDir = path.join(__dirname, "migrations");
	const migrationFiles = fs.readdirSync(migrationsDir);

	for (const file of migrationFiles) {
		const filePath = path.join(migrationsDir, file);
		const params = [username, wallet];

		await runMigration(filePath, params);
	} 
}

export{runMigration, runAllMigrations}
