"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

const MAX_ATTEMPTS = 3;
const LOCKOUT_MS = 15 * 60 * 1000;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem("login_lockout");
    if (stored) {
      const until = parseInt(stored);
      if (until > Date.now()) {
        setLockedUntil(until);
        setTimeLeft(Math.ceil((until - Date.now()) / 1000));
      } else {
        sessionStorage.removeItem("login_lockout");
        sessionStorage.removeItem("login_attempts");
      }
    }
    const storedAttempts = sessionStorage.getItem("login_attempts");
    if (storedAttempts) setAttempts(parseInt(storedAttempts));
  }, []);

  useEffect(() => {
    if (!lockedUntil) return;
    const interval = setInterval(() => {
      const remaining = Math.ceil((lockedUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockedUntil(null);
        setAttempts(0);
        setTimeLeft(0);
        sessionStorage.removeItem("login_lockout");
        sessionStorage.removeItem("login_attempts");
        clearInterval(interval);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockedUntil]);

  const isLocked = lockedUntil !== null && lockedUntil > Date.now();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (isLocked) return;
    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      if (loginError) {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        sessionStorage.setItem("login_attempts", String(newAttempts));
        if (newAttempts >= MAX_ATTEMPTS) {
          const until = Date.now() + LOCKOUT_MS;
          setLockedUntil(until);
          setTimeLeft(Math.ceil(LOCKOUT_MS / 1000));
          sessionStorage.setItem("login_lockout", String(until));
          setError("Too many failed attempts. Account locked for 15 minutes.");
        } else {
          setError(`Incorrect email or password. ${MAX_ATTEMPTS - newAttempts} attempt${MAX_ATTEMPTS - newAttempts === 1 ? "" : "s"} remaining.`);
        }
        return;
      }
      sessionStorage.removeItem("login_lockout");
      sessionStorage.removeItem("login_attempts");
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;

  return (
    <div className="w-full max-w-md">
      <div className="card-warm p-10">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3" role="img" aria-label="Welcome home">🏠</div>
          <h1 className="font-serif text-3xl text-ink mb-2">Welcome back</h1>
          <p className="font-body text-sepia-500 text-base">Sign in to manage your legacy letters.</p>
        </div>

        {isLocked ? (
          <div role="alert" aria-live="assertive" className="bg-red-50 border border-red-200 rounded-xl px-6 py-6 text-center">
            <div className="text-3xl mb-3" role="img" aria-label="Locked">🔒</div>
            <p className="font-serif text-xl text-red-800 mb-2">Account temporarily locked</p>
            <p className="font-sans text-base text-red-700 mb-4">Too many failed attempts. Please wait before trying again.</p>
            <p className="font-sans text-3xl font-500 text-red-800 tabular-nums" aria-live="polite" aria-atomic="true" aria-label={`${minutesLeft} minutes and ${secondsLeft} seconds remaining`}>
              {String(minutesLeft).padStart(2, "0")}:{String(secondsLeft).padStart(2, "0")}
            </p>
            <p className="font-sans text-sm text-red-600 mt-1">minutes remaining</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} noValidate className="space-y-5" aria-label="Sign in form">
            <div>
              <label htmlFor="login-email" className="label-warm text-lg">Email address</label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-warm"
                placeholder="you@example.com"
                aria-required="true"
                aria-describedby={error ? "login-error" : undefined}
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="login-password" className="label-warm text-lg">Password</label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-warm"
                placeholder="Your password"
                aria-required="true"
                disabled={loading}
              />
              <div className="flex justify-end mt-2">
                <Link href="/auth/forgot-password" className="font-sans text-sm text-burgundy hover:underline focus:outline-none focus:ring-2 focus:ring-burgundy/30 rounded px-1">
                  Forgot your password?
                </Link>
              </div>
            </div>

            {error && (
              <div id="login-error" role="alert" aria-live="assertive" className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 font-sans text-sm text-red-700">
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
        )}

        <p className="text-center font-sans text-sm text-sepia-500 mt-6">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-burgundy hover:underline font-500 focus:outline-none focus:ring-2 focus:ring-burgundy/30 rounded px-1">
            Start your free trial
          </Link>
        </p>
      </div>
    </div>
  );
}
