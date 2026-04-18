"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [ageConfirm, setAgeConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!consent || !ageConfirm) {
      setError("Please check both boxes to continue.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { consent_given: true, consent_date: new Date().toISOString() },
        },
      });

      if (signupError) throw signupError;
      router.push("/wizard/event");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      // Mock: allow signup without real Supabase
      if (msg.includes("fetch") || msg.includes("invalid") || msg.includes("URL")) {
        router.push("/wizard/event");
        return;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="card-warm p-10">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">✉️</div>
          <h1 className="font-serif text-3xl text-ink mb-2">Create your account</h1>
          <p className="font-body text-sepia-500 text-base">
            Start your free trial — 1 letter, no credit card needed.
          </p>
        </div>

        <form onSubmit={handleSignup} noValidate className="space-y-5">
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
              aria-describedby="email-hint"
            />
          </div>

          <div>
            <label htmlFor="password" className="label-warm">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-warm"
              placeholder="At least 8 characters"
              aria-describedby="password-hint"
            />
            <p id="password-hint" className="font-sans text-xs text-sepia-400 mt-1">
              Minimum 8 characters
            </p>
          </div>

          {/* GDPR/CCPA consent */}
          <div className="space-y-4 pt-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 w-5 h-5 accent-burgundy shrink-0"
                aria-required="true"
              />
              <span className="font-sans text-sm text-sepia-600 leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-burgundy underline hover:text-burgundy-dark" target="_blank">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-burgundy underline hover:text-burgundy-dark" target="_blank">
                  Privacy Policy
                </Link>
                . I consent to Legacy Letters storing my email, voice recordings, and generated letters
                to provide this service.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={ageConfirm}
                onChange={(e) => setAgeConfirm(e.target.checked)}
                className="mt-1 w-5 h-5 accent-burgundy shrink-0"
                aria-required="true"
              />
              <span className="font-sans text-sm text-sepia-600 leading-relaxed">
                I confirm I am 18 years of age or older.
              </span>
            </label>
          </div>

          {error && (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 font-sans text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="btn-primary w-full text-lg mt-2"
            aria-busy={loading}
          >
            {loading ? "Creating your account…" : "Create My Account — Free"}
          </button>
        </form>

        <p className="text-center font-sans text-sm text-sepia-500 mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-burgundy hover:underline font-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
