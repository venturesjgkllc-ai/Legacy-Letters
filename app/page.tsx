import Link from "next/link";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: "🎙️",
    title: "Just talk — we do the rest",
    desc: "Record your voice for a few minutes. No writing, no typing. Just your stories, told naturally.",
  },
  {
    icon: "✍️",
    title: "Transformed into a beautiful letter",
    desc: "Our AI listens, understands, and rewrites your words into a warm, story-rich letter your family will treasure.",
  },
  {
    icon: "📅",
    title: "Delivered at exactly the right moment",
    desc: "Schedule it for a birthday, wedding, anniversary, or graduation — delivered by email on the perfect day.",
  },
  {
    icon: "🔒",
    title: "Private, safe, and yours",
    desc: "Your recordings and letters are stored securely. We never share your words with anyone.",
  },
];

const testimonials = [
  {
    quote: "My daughter read her letter at the reception. There wasn't a dry eye in the room. I've never been so glad I did something.",
    name: "Robert, 61",
    event: "Wedding letter",
  },
  {
    quote: "I always meant to write these things down. Legacy Letters made it easy enough that I actually did it.",
    name: "Margaret, 58",
    event: "Birthday letter",
  },
  {
    quote: "My grandson is heading to college. He doesn't know it yet, but he has a letter waiting for him on move-in day.",
    name: "Gerald, 67",
    event: "Graduation letter",
  },
];

const steps = [
  { num: "1", title: "Choose your moment", desc: "Pick the event — birthday, wedding, anniversary, or graduation — and who it's for." },
  { num: "2", title: "Record your story", desc: "Hit record and just talk. Share a memory, a lesson, a piece of your heart. 4–6 minutes is perfect." },
  { num: "3", title: "We craft the letter", desc: "Our AI transforms your recording into a beautiful, heartfelt letter — in your voice, your spirit." },
  { num: "4", title: "It arrives on cue", desc: "Schedule delivery for the exact day. They open their email and find something they'll keep forever." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-parchment">
      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-parchment/95 backdrop-blur border-b border-sepia-100">
        <div className="max-w-5xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl text-burgundy font-bold tracking-tight">
            Legacy Letters
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="font-sans text-base text-sepia-600 hover:text-burgundy transition-colors px-4 py-2"
            >
              Sign in
            </Link>
            <Link href="/auth/signup" className="btn-primary text-base px-6 py-3">
              Start free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-5 py-2 mb-8">
          <span className="text-gold-dark font-sans text-sm font-500">Free trial — 1 letter, no credit card needed</span>
        </div>

        <h1 className="font-serif text-5xl md:text-6xl text-ink mb-6 text-balance leading-tight">
          Your voice today,
          <br />
          <em className="text-burgundy">their treasure</em> tomorrow
        </h1>

        <p className="font-body text-xl text-sepia-600 max-w-2xl mx-auto mb-12 text-balance leading-relaxed">
          Record a life story. We turn it into a beautiful letter — delivered by email
          on your schedule, right when it matters most.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/auth/signup" className="btn-primary text-xl px-10 py-5 w-full sm:w-auto">
            Start My Legacy – Free Trial
          </Link>
          <Link href="#how-it-works" className="btn-secondary text-xl px-10 py-5 w-full sm:w-auto">
            See how it works
          </Link>
        </div>

        <p className="font-sans text-sm text-sepia-400">
          For birthdays · weddings · anniversaries · graduations
        </p>
      </section>

      {/* ── HERO LETTER PREVIEW ── */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="parchment-paper rounded-3xl p-10 relative">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🎂</div>
            <div className="font-script text-2xl text-gold-dark">Happy Birthday</div>
            <div className="w-24 h-px bg-sepia-300 mx-auto mt-3"></div>
          </div>
          <p className="font-body text-sepia-700 text-lg leading-relaxed italic">
            "Dear Emily, on this special birthday I find myself reaching back through the years
            to find the words that have always lived in my heart but rarely made it to my lips.
            I remember the day you were born as though the world itself paused to take notice..."
          </p>
          <div className="mt-6 text-right font-script text-xl text-burgundy">
            — With all my love, Dad
          </div>
          <div className="absolute bottom-4 right-6 font-sans text-xs text-sepia-300">
            Delivered on her 30th birthday ·  June 14th
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="bg-cream py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-ink mb-4">Simple as a conversation</h2>
            <p className="font-body text-sepia-600 text-xl">
              Four steps. No writing required. Just your stories.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="card-warm p-8 flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-burgundy text-cream font-serif text-xl font-bold flex items-center justify-center shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-serif text-xl text-ink mb-2">{step.title}</h3>
                  <p className="font-body text-sepia-600 text-base leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-ink mb-4">Why Legacy Letters?</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((f) => (
            <div key={f.title} className="flex gap-5 items-start p-6 rounded-2xl hover:bg-cream transition-colors">
              <span className="text-3xl shrink-0">{f.icon}</span>
              <div>
                <h3 className="font-serif text-xl text-ink mb-2">{f.title}</h3>
                <p className="font-body text-sepia-600 text-base leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-burgundy/5 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-ink mb-4">Words from our families</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="card-warm p-8">
                <div className="text-4xl text-gold mb-4">"</div>
                <p className="font-body text-sepia-700 text-base leading-relaxed italic mb-6">
                  {t.quote}
                </p>
                <div>
                  <div className="font-sans font-500 text-ink text-base">{t.name}</div>
                  <div className="font-sans text-sm text-sepia-400">{t.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-ink mb-4">Simple, honest pricing</h2>
          <p className="font-body text-sepia-600 text-xl">
            Start free. Add more letters anytime.
          </p>
        </div>

        {/* Free trial card */}
        <div className="card-warm border-2 border-gold/40 p-8 mb-8 text-center max-w-md mx-auto">
          <div className="font-script text-2xl text-gold-dark mb-2">Free Trial</div>
          <div className="font-serif text-5xl text-ink mb-1">$0</div>
          <p className="font-body text-sepia-500 text-base mb-6">1 letter · PDF download · No card needed</p>
          <Link href="/auth/signup" className="btn-gold w-full block text-center">
            Start My Free Letter
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Keepsake", count: 3, price: 29 },
            { name: "Legacy", count: 6, price: 59, popular: true },
            { name: "Heritage", count: 10, price: 89 },
          ].map((pkg) => (
            <div
              key={pkg.name}
              className={cn(
                "card-warm p-8 text-center",
                pkg.popular && "border-2 border-burgundy ring-4 ring-burgundy/10"
              )}
            >
              {pkg.popular && (
                <div className="bg-burgundy text-cream font-sans text-sm font-500 rounded-full px-4 py-1 inline-block mb-4">
                  Most popular
                </div>
              )}
              <div className="font-serif text-2xl text-ink mb-2">{pkg.name}</div>
              <div className="font-serif text-4xl text-burgundy mb-1">${pkg.price}</div>
              <div className="font-sans text-sepia-500 text-sm mb-2">{pkg.count} letters · PDF delivery</div>
              <div className="font-sans text-sepia-400 text-sm mb-6">
                Add physical mailing for $19/letter (US only)
              </div>
              <Link href="/auth/signup" className="btn-secondary w-full block text-center text-base py-3">
                Get started
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center font-sans text-sepia-400 text-sm mt-6">
          Add more letters anytime · Secure checkout via Stripe
        </p>
      </section>

      {/* ── TRUST SECTION ── */}
      <section className="bg-sepia-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-ink mb-4">Your stories are safe with us</h2>
          <p className="font-body text-sepia-600 text-lg mb-8 max-w-2xl mx-auto">
            We take your privacy seriously. Your recordings, letters, and personal information
            are encrypted and stored securely. We never sell or share your data.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sepia-500 font-sans text-sm">
            <span>🔒 End-to-end encrypted</span>
            <span>🚫 Never sold to third parties</span>
            <span>📋 GDPR & CCPA compliant</span>
            <span>🗑️ Delete your data anytime</span>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="font-serif text-4xl text-ink mb-4">
          The letter you've been meaning to write
        </h2>
        <p className="font-body text-sepia-600 text-xl mb-10">
          You don't need to find the perfect words. Just start talking. We'll take it from there.
        </p>
        <Link href="/auth/signup" className="btn-primary text-xl px-12 py-5">
          Start My Legacy – It's Free
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-sepia-200 bg-cream py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="font-serif text-xl text-burgundy font-bold mb-1">Legacy Letters</div>
              <div className="font-body text-sepia-400 text-sm">Your stories, their keepsakes.</div>
            </div>
            <div className="flex flex-wrap gap-6 font-sans text-sm text-sepia-500">
              <Link href="/privacy" className="hover:text-burgundy transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-burgundy transition-colors">Terms of Use</Link>
              <Link href="/privacy#do-not-sell" className="hover:text-burgundy transition-colors">
                Do Not Sell My Personal Information
              </Link>
              <a href="mailto:hello@legacyletters.com" className="hover:text-burgundy transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-sepia-100 font-sans text-xs text-sepia-400 text-center">
            © {new Date().getFullYear()} Legacy Letters. All rights reserved. Made with love for families everywhere.
          </div>
        </div>
      </footer>
    </div>
  );
}
