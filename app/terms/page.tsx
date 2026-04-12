import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — Legacy Letters",
  description: "Terms and conditions for using the Legacy Letters service.",
};

export default function TermsPage() {
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
        <h1 className="font-serif text-4xl text-ink mb-3">Terms of Use</h1>
        <p className="font-sans text-sm text-sepia-400 mb-12">Last updated: {lastUpdated}</p>

        <div className="space-y-10">

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">Acceptance of terms</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed">
              By creating an account or using Legacy Letters ("Service"), you agree to be bound by these Terms of Use.
              If you do not agree to these terms, please do not use the Service. These terms apply to all visitors,
              users, and others who access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">Eligibility</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed">
              You must be at least 18 years old to use this Service. By using Legacy Letters, you represent that
              you are 18 years of age or older and have the legal capacity to enter into these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">The service</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed">
              Legacy Letters provides a platform for users to record audio stories, which are transcribed and
              rewritten into personalized letters using artificial intelligence, and scheduled for delivery by
              email on specified dates. Physical delivery options are available for US addresses at additional cost.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">Free trial and payments</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed mb-4">
              New users receive one free letter (PDF download only) with no payment required. To schedule
              email delivery or create additional letters, a paid package must be purchased. Physical delivery
              requires an additional fee per letter and is available to US addresses only.
            </p>
            <p className="font-body text-sepia-700 text-lg leading-relaxed">
              All payments are processed securely by Stripe. Purchases are non-refundable once a letter has been
              generated and delivered. If you experience a technical issue that prevents delivery, please contact
              us at support@legacyletters.com within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">Your content</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed mb-4">
              You retain ownership of the audio recordings and the stories you share. By using the Service,
              you grant Legacy Letters a limited license to process, transcribe, and transform your recordings
              solely for the purpose of generating and delivering your letters.
            </p>
            <p className="font-body text-sepia-700 text-lg leading-relaxed">
              You represent that you have the right to share the stories and content you record, and that your
              content does not violate any third-party rights or applicable law. You agree not to record or
              submit content that is harmful, defamatory, illegal, or violates the privacy of others.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">AI-generated content</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed">
              Letters are generated using artificial intelligence (OpenAI GPT-4o). While we strive for quality
              and accuracy, AI-generated content may not perfectly capture every nuance of your original recording.
              You have the opportunity to review and edit your letter before saving it. We are not responsible
              for errors in AI-generated content.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">Email delivery</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed">
              You are responsible for providing accurate recipient email addresses. Legacy Letters is not
              responsible for undelivered emails due to incorrect addresses, full inboxes, spam filters,
              or other factors outside our control. You confirm that you have the recipient's consent to
              receive letters on their behalf.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">Prohibited uses</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed mb-3">You agree not to use Legacy Letters to:</p>
            <ul className="space-y-2">
              {[
                "Impersonate any person or entity",
                "Harass, threaten, or harm any individual",
                "Record or transmit content that is defamatory, abusive, or illegal",
                "Violate any applicable local, state, national, or international law",
                "Attempt to reverse-engineer, hack, or compromise the Service",
                "Use the Service for commercial bulk messaging or spam",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="text-burgundy mt-1 shrink-0">•</span>
                  <span className="font-body text-sepia-700 text-base">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">Disclaimers and limitation of liability</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed mb-4">
              The Service is provided "as is" without warranties of any kind. We do not guarantee uninterrupted
              or error-free operation of the Service.
            </p>
            <p className="font-body text-sepia-700 text-lg leading-relaxed">
              To the fullest extent permitted by law, Legacy Letters shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages, including loss of data or failed letter
              delivery. Our total liability to you for any claim arising from these Terms shall not exceed
              the amount you paid us in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">Termination</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed">
              You may delete your account at any time by contacting us at support@legacyletters.com.
              We may suspend or terminate your account if you violate these Terms. Upon termination,
              your right to use the Service ceases and your data will be deleted per our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">Changes to these terms</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed">
              We may update these Terms from time to time. We will notify you of significant changes by email
              or by posting a notice on the Service. Continued use after changes constitutes acceptance of the
              updated Terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">Contact</h2>
            <p className="font-body text-sepia-700 text-lg leading-relaxed">
              For questions about these Terms, contact us at:
            </p>
            <div className="bg-cream rounded-xl p-6 mt-4 border border-sepia-100">
              <p className="font-serif text-lg text-ink">Legacy Letters</p>
              <p className="font-body text-sepia-600">support@legacyletters.com</p>
            </div>
          </section>

        </div>
      </div>

      <footer className="border-t border-sepia-200 bg-cream py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap gap-6 font-sans text-sm text-sepia-400 justify-center">
          <Link href="/" className="hover:text-burgundy">Home</Link>
          <Link href="/privacy" className="hover:text-burgundy">Privacy Policy</Link>
          <Link href="/privacy#do-not-sell" className="hover:text-burgundy">Do Not Sell My Personal Information</Link>
        </div>
      </footer>
    </div>
  );
}
