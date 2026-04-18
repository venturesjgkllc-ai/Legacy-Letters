"use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (resetError) throw resetError;
      setSent(true);
    } catch {
      setError("Something went wrong. Please check your email and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="card-warm p-10">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3" role="img" aria-label="Key">🔑</div>
          <h1 className="font-serif text-3xl text-ink mb-2">Reset your password</h1>
          <p className="font-body text-sepia-500 text-base">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        {sent ? (
          <div role="status" aria-live="polite" className="text-center">
            <div className="text-5xl mb-4" role="img" aria-label="Email sent">📬</div>
            <h2 className="font-serif text-2xl text-ink mb-3">Check your inbox</h2>
            <p className="font-body text-sepia-600 text-base mb-6">
              We've sent a password reset link to <strong>{email}</strong>.
              Check your email and click the link to set a new password.
            </p>
            <p className="font-sans text-sm text-sepia-400 mb-6">
              Didn't receive it? Check your spam folder or try again.
            </p>
            <button
              onClick={() => setSent(false)}
              className="btn-secondary w-full text-base"
            >
              Try a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Password reset form">
            <div>
              <label htmlFor="reset-email" className="label-warm text-lg">
                Email address
              </label>
              <input
                id="reset-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-warm"
                placeholder="you@example.com"
                aria-required="true"
                aria-describedby={error ? "reset-error" : "reset-hint"}
                disabled={loading}
              />
              <p id="reset-hint" className="font-sans text-sm text-sepia-400 mt-2">
                Enter the email address associated with your account.
              </p>
            </div>

            {error && (
              <div id="reset-error" role="alert" aria-live="assertive" className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 font-sans text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email}
              className="btn-primary w-full text-lg"
              aria-busy={loading}
            >
              {loading ? "Sending reset link…" : "Send Reset Link"}
            </button>
          </form>
        )}

        <p className="text-center font-sans text-sm text-sepia-500 mt-6">
          Remember your password?{" "}
          <Link href="/auth/login" className="text-burgundy hover:underline font-500 focus:outline-none focus:ring-2 focus:ring-burgundy/30 rounded px-1">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
