"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      setSuccess(true);
      setTimeout(() => router.push("/auth/login"), 3000);
    } catch {
      setError("Failed to reset password. Your link may have expired. Please request a new one.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="card-warm p-10 text-center">
          <div className="text-5xl mb-4" role="img" aria-label="Success">✅</div>
          <h1 className="font-serif text-3xl text-ink mb-3">Password updated!</h1>
          <p className="font-body text-sepia-600 text-base">
            Your password has been changed successfully. Redirecting you to sign in…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="card-warm p-10">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3" role="img" aria-label="Lock">🔒</div>
          <h1 className="font-serif text-3xl text-ink mb-2">Set a new password</h1>
          <p className="font-body text-sepia-500 text-base">
            Choose a new password for your account.
          </p>
        </div>

        <form onSubmit={handleReset} noValidate className="space-y-5" aria-label="Set new password form">
          <div>
            <label htmlFor="new-password" className="label-warm text-lg">New password</label>
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-warm"
              placeholder="At least 8 characters"
              aria-required="true"
              aria-describedby="password-requirements"
              disabled={loading}
            />
            <p id="password-requirements" className="font-sans text-sm text-sepia-400 mt-1">
              Minimum 8 characters
            </p>
          </div>

          <div>
            <label htmlFor="confirm-password" className="label-warm text-lg">Confirm new password</label>
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="input-warm"
              placeholder="Repeat your new password"
              aria-required="true"
              disabled={loading}
            />
          </div>

          {error && (
            <div role="alert" aria-live="assertive" className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 font-sans text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password || !confirm}
            className="btn-primary w-full text-lg"
            aria-busy={loading}
          >
            {loading ? "Updating password…" : "Set New Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
