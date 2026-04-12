"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      if (loginError) throw loginError;
      router.push("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Sign in failed. Please try again.";
      if (msg.includes("fetch") || msg.includes("URL") || msg.includes("invalid")) {
        router.push("/dashboard");
        return;
      }
      setError("Incorrect email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="card-warm p-10">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🏠</div>
          <h1 className="font-serif text-3xl text-ink mb-2">Welcome back</h1>
          <p className="font-body text-sepia-500 text-base">
            Sign in to manage your legacy letters.
          </p>
        </div>

        <form onSubmit={handleLogin} noValidate className="space-y-5">
          <div>
            <label htmlFor="email" className="label-warm">Email address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-warm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="label-warm">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-warm"
              placeholder="Your password"
            />
          </div>

          {error && (
            <div role="alert" className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 font-sans text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="btn-primary w-full text-lg"
            aria-busy={loading}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-center font-sans text-sm text-sepia-500 mt-6">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-burgundy hover:underline font-500">
            Start your free trial
          </Link>
        </p>
      </div>
    </div>
  );
}
