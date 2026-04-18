import { Metadata } from "next";
import ContactForm from "./ContactForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us — Legacy Letters",
  description: "Get in touch with the Legacy Letters team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-parchment">
      <nav className="bg-cream border-b border-sepia-100 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-serif text-xl text-burgundy font-bold">Legacy Letters</Link>
          <Link href="/" className="font-sans text-sm text-sepia-500 hover:text-burgundy transition-colors">← Back to home</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4" role="img" aria-label="Envelope">✉️</div>
          <h1 className="font-serif text-4xl text-ink mb-3">Get in touch</h1>
          <p className="font-body text-sepia-600 text-lg">
            We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        <ContactForm />

        <div className="mt-12 text-center">
          <p className="font-sans text-sm text-sepia-400">
            You can also reach us directly at{" "}
            <a
              href="mailto:hello@legacyletters.com"
              className="text-burgundy hover:underline focus:outline-none focus:ring-2 focus:ring-burgundy/30 rounded"
            >
              hello@legacyletters.com
            </a>
          </p>
        </div>
      </div>

      <footer className="border-t border-sepia-200 bg-cream py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap gap-6 font-sans text-sm text-sepia-400 justify-center">
          <Link href="/" className="hover:text-burgundy">Home</Link>
          <Link href="/privacy" className="hover:text-burgundy">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-burgundy">Terms of Use</Link>
        </div>
      </footer>
    </div>
  );
}
