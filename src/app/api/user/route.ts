// app/api/user/route.ts
import { NextResponse } from "next/server";
import { findUser } from "@/modules/scripts/supabase/findUser";
import { insertUser } from "@/modules/scripts/supabase/insertUser";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const user = searchParams.get("user");
	const wallet = searchParams.get("wallet");

	console.log("username:", user, "wallet:", wallet);

	const userFind = await findUser(user as string, wallet as string);
	console.log("User find:", userFind);

	if (!userFind) {
		const insert = await insertUser(
			user as string,
			wallet as string
		);
		console.log("Insert successful:", insert);
	}

	return NextResponse.json({
		userFound: !userFind,
		inserted: userFind,
	});
}
