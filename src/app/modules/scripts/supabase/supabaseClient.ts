import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

// Use your Supabase project credentials
const SUPABASE_URL = process.env.SUPABASE_URL!; // Non-null assertion
const SUPABASE_KEY = process.env.SUPABASE_PUBLIC_KEY!; // Non-null assertion

// Create the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export { supabase };
