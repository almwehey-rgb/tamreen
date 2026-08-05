import { supabase } from "./supabaseClient.js";

async function main() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Failed to reach Supabase:", error.message);
    process.exit(1);
  }
  console.log("Connected to Supabase. Current session:", data.session);
}

main();
