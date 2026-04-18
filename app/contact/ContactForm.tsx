"use client";
import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed to send");
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly at hello@legacyletters.com");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="card-warm p-10 text-center"
      >
        <div className="text-5xl mb-4" role="img" aria-label="Message sent">💌</div>
        <h2 className="font-serif text-2xl text-ink mb-3">Message sent!</h2>
        <p className="font-body text-sepia-600 text-base">
          Thank you for reaching out, {name}. We'll get back to you at {email} as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <div className="card-warm p-8">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6"
        aria-label="Contact form"
      >
        <div>
          <label htmlFor="contact-name" className="label-warm text-lg">
            Your name <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-warm"
            placeholder="Your full name"
            aria-required="true"
            disabled={loading}
            maxLength={100}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="label-warm text-lg">
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-warm"
            placeholder="you@example.com"
            aria-required="true"
            aria-describedby="contact-email-hint"
            disabled={loading}
          />
          <p id="contact-email-hint" className="font-sans text-sm text-sepia-400 mt-1">
            We'll reply to this email address.
          </p>
        </div>

        <div>
          <label htmlFor="contact-message" className="label-warm text-lg">
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="textarea-warm"
            placeholder="How can we help you?"
            aria-required="true"
            disabled={loading}
            rows={6}
            maxLength={2000}
          />
          <p className="font-sans text-xs text-sepia-400 mt-1 text-right" aria-live="polite">
            {message.length}/2000
          </p>
        </div>

        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 font-sans text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !name || !email || !message}
          className="btn-primary w-full text-xl py-5"
          aria-busy={loading}
        >
          {loading ? "Sending your message…" : "Send Message"}
        </button>

        <p className="font-sans text-xs text-sepia-400 text-center">
          Fields marked with * are required
        </p>
      </form>
    </div>
  );
}
