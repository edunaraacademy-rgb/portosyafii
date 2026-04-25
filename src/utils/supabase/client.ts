import { createBrowserClient } from "@supabase/ssr";

// Moving variables inside the function to avoid module-level errors during build

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Return a dummy client or handle it to prevent build crash
    // In production/runtime, this will still need the real variables
    return createBrowserClient("", ""); 
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
};
