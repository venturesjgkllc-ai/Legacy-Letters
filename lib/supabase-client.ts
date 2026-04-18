"use client";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,       // No persistent sessions — require login every visit
        autoRefreshToken: false,     // Do not auto-refresh
        detectSessionInUrl: true,    // Still needed for password reset links
      },
    }
  );
}
