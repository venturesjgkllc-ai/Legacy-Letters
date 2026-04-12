import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Legacy Letters",
  description: "How Legacy Letters collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  const lastUpdated = "January 1, 2025";

  return (
    <div className="min-h-screen bg-parchment">
      <nav className="bg-cream border-b border-sepia-100 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-serif text-xl text-burgundy font-bold">Legacy Letters</Link>
          <Link href="/" className="font-sans text-sm text-sepia-500 hover:text-burgundy">← Back to home</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-serif text-4xl text-ink mb-3">Privacy Policy</h1>
        <p className="font-sans text-sm text-sepia-400 mb-12">Last updated: {lastUpdated}</p>

        <div className="prose-warm space-y-10">

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">Who we are</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed">
              Legacy Letters ("we," "us," or "our") operates the Legacy Letters service at legacyletters.com.
              We help families record and deliver heartfelt personal letters for birthdays, weddings, anniversaries, and graduations.
              We are committed to protecting your personal information and being transparent about how we use it.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">Information we collect</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed mb-4">We collect the following categories of personal information:</p>
            <ul className="space-y-3">
              {[
                ["Full name", "Your name and the name you use to sign your letters"],
                ["Email address", "Your account email and the recipient's email address for letter delivery"],
                ["Telephone number", "If you choose to provide it for account recovery or support"],
                ["Mailing address", "Recipient's address, if you opt into physical letter delivery (US only)"],
                ["Voice audio recordings", "Audio you record in the recording room for transcription"],
                ["Transcripts", "Text transcribed from your audio recordings using OpenAI Whisper"],
                ["AI-rewritten letters", "The letters our AI generates from your transcript using GPT-4o"],
                ["Event details", "Event type (birthday, wedding, etc.), event date, and recipient relationship"],
                ["Payment information", "Processed securely by Stripe — we never see or store your card number"],
                ["Usage data", "How you interact with our service (pages visited, features used), for improving the product"],
              ].map(([item, desc]) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="text-burgundy mt-1 shrink-0">•</span>
                  <div className="font-body text-sepia-700 text-base">
                    <strong className="font-500 text-ink">{item}:</strong> {desc}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">How we use your information</h2>
            <ul className="space-y-3">
              {[
                "To create and manage your account",
                "To transcribe your voice recordings into text",
                "To generate personalized heartfelt letters using AI",
                "To deliver letters to recipients by email on scheduled dates",
                "To process payments through Stripe",
                "To send physical postcards or letters through Lob (if you opt in)",
                "To send you service-related emails (confirmations, reminders, delivery notifications)",
                "To improve our service and fix issues",
                "To comply with legal obligations",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="text-burgundy mt-1 shrink-0">•</span>
                  <span className="font-body text-sepia-700 text-base">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">How we store your information</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed">
              Your personal data is stored securely using Supabase, which provides encrypted PostgreSQL databases
              and object storage hosted on AWS infrastructure. Audio recordings, generated PDFs, and letter text
              are stored in Supabase Storage with access controls ensuring only you and our service can access them.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">Third parties we share data with</h2>
            <div className="space-y-4">
              {[
                ["OpenAI", "Your voice recordings and transcripts are sent to OpenAI to power transcription (Whisper) and letter generation (GPT-4o). OpenAI's data use is governed by their API data usage policies."],
                ["Stripe", "Payment processing. We share your email and purchase amount. Stripe stores payment card information — we never see your card number."],
                ["Lob", "If you purchase physical delivery, your recipient's name and mailing address are sent to Lob for postcard printing and mailing."],
                ["Resend", "We use Resend to deliver letters by email. Your recipient's email address and the letter content are shared with Resend for delivery."],
                ["Supabase", "Our database and file storage provider. Your data is hosted on their infrastructure."],
                ["Vercel", "Our hosting provider. Web request metadata (IP addresses, user agents) may pass through Vercel infrastructure."],
              ].map(([name, desc]) => (
                <div key={name} className="bg-cream rounded-xl p-5 border border-sepia-100">
                  <h3 className="font-serif text-lg text-ink mb-2">{name}</h3>
                  <p className="font-body text-sepia-600 text-base">{desc}</p>
                </div>
              ))}
            </div>
            <p className="font-body text-sepia-600 text-base mt-4">
              We do not sell your personal information to advertisers or data brokers.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">Data retention</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed">
              We retain your account information, recordings, and letters for as long as your account is active.
              If you delete your account, we will delete your personal data within 30 days, except where retention
              is required by law (e.g., payment records for tax purposes, which are retained for 7 years).
            </p>
          </section>

          <section id="do-not-sell">
            <h2 className="font-serif text-2xl text-ink mb-4">Do Not Sell or Share My Personal Information</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed mb-4">
              We do not sell your personal information. We do not share your personal information with third
              parties for their own marketing purposes.
            </p>
            <p className="font-body text-sepia-700 text-lg leading-relaxed">
              California residents have the right to opt out of the "sale" or "sharing" of personal information
              under the CCPA/CPRA. Because we do not sell or share personal information for cross-context behavioral
              advertising, there is nothing to opt out of. If you have questions, contact us at privacy@legacyletters.com.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">Your rights</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed mb-4">
              Depending on where you live, you may have the following rights regarding your personal information:
            </p>
            <ul className="space-y-3">
              {[
                ["Right to access", "Request a copy of all personal data we hold about you"],
                ["Right to correction", "Request correction of inaccurate personal data"],
                ["Right to deletion", "Request deletion of your personal data (\"right to be forgotten\")"],
                ["Right to portability", "Receive your data in a structured, machine-readable format"],
                ["Right to object", "Object to certain processing of your personal data"],
                ["Right to withdraw consent", "Withdraw consent at any time where processing is based on consent"],
              ].map(([right, desc]) => (
                <li key={right} className="flex gap-3 items-start">
                  <span className="text-burgundy mt-1 shrink-0">•</span>
                  <div className="font-body text-sepia-700 text-base">
                    <strong className="font-500 text-ink">{right}:</strong> {desc}
                  </div>
                </li>
              ))}
            </ul>
            <p className="font-body text-sepia-700 text-lg leading-relaxed mt-4">
              To exercise any of these rights, email us at privacy@legacyletters.com. We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">Cookies</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed">
              We use essential cookies for authentication (keeping you logged in) and session management.
              We do not use advertising or tracking cookies. We do not use third-party analytics cookies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">Children's privacy</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed">
              Our service is intended for adults 18 years and older. We do not knowingly collect personal
              information from children under 13. If you believe we have inadvertently collected such data,
              please contact us immediately at privacy@legacyletters.com.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">Contact us</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed">
              For privacy questions, data requests, or to exercise your rights, contact us at:
            </p>
            <div className="bg-cream rounded-xl p-6 mt-4 border border-sepia-100">
              <p className="font-serif text-lg text-ink">Legacy Letters</p>
              <p className="font-body text-sepia-600">privacy@legacyletters.com</p>
            </div>
          </section>

        </div>
      </div>

      <footer className="border-t border-sepia-200 bg-cream py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap gap-6 font-sans text-sm text-sepia-400 justify-center">
          <Link href="/" className="hover:text-burgundy">Home</Link>
          <Link href="/terms" className="hover:text-burgundy">Terms of Use</Link>
          <Link href="/privacy#do-not-sell" className="hover:text-burgundy">Do Not Sell My Personal Information</Link>
        </div>
      </footer>
    </div>
  );
}
