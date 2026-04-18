"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { WizardProvider, useWizard } from "@/lib/wizard-context";
import { cn } from "@/lib/utils";

const STEPS = [
  { path: "/wizard/event",     label: "Event",    num: 1 },
  { path: "/wizard/recipient", label: "Recipient",num: 2 },
  { path: "/wizard/sender",    label: "You",      num: 3 },
  { path: "/wizard/prompts",   label: "Prompt",   num: 4 },
  { path: "/wizard/record",    label: "Record",   num: 5 },
  { path: "/wizard/preview",   label: "Letter",   num: 6 },
];

function WizardProgress() {
  const pathname = usePathname();
  const currentIndex = STEPS.findIndex((s) => pathname.startsWith(s.path));
  const currentStep = STEPS[currentIndex];

  return (
    <div className="w-full max-w-lg mx-auto mb-10">
      <div
        className="flex items-center justify-center gap-2 mb-3"
        role="progressbar"
        aria-valuenow={currentIndex + 1}
        aria-valuemin={1}
        aria-valuemax={STEPS.length}
        aria-label={`Step ${currentIndex + 1} of ${STEPS.length}: ${currentStep?.label}`}
      >
        {STEPS.map((step, i) => (
          <div
            key={step.path}
            className={cn(
              "transition-all duration-300 rounded-full",
              i === currentIndex && "w-8 h-3 bg-burgundy",
              i < currentIndex  && "w-3 h-3 bg-burgundy/50",
              i > currentIndex  && "w-3 h-3 bg-sepia-200"
            )}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="text-center font-sans text-sm text-sepia-400" aria-live="polite">
        Step {currentIndex + 1} of {STEPS.length}
        {currentIndex >= 0 && (
          <span className="ml-2 text-sepia-500 font-500">— {STEPS[currentIndex]?.label}</span>
        )}
      </p>
    </div>
  );
}

function SaveExitButton() {
  const { state } = useWizard();
  const router = useRouter();

  function handleSaveExit() {
    // Save wizard state to localStorage (excluding non-serializable audioBlob)
    const toSave = { ...state, audioBlob: null };
    try {
      localStorage.setItem("wizard_progress", JSON.stringify(toSave));
    } catch {}
    router.push("/dashboard");
  }

  return (
    <button
      onClick={handleSaveExit}
      className="font-sans text-sm text-sepia-500 hover:text-burgundy transition-colors focus:outline-none focus:ring-2 focus:ring-burgundy/30 rounded px-2 py-1"
      aria-label="Save your progress and return to dashboard"
    >
      Save &amp; exit
    </button>
  );
}

export default function WizardLayout({ children }: { children: React.ReactNode }) {
  return (
    <WizardProvider>
      {/* Skip to main content */}
      <a href="#wizard-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-burgundy text-cream px-4 py-2 rounded-lg z-50 font-sans text-sm">
        Skip to main content
      </a>

      <div className="min-h-screen bg-parchment flex flex-col">
        <header>
          <div className="py-6 px-6 flex items-center justify-between border-b border-sepia-100 bg-cream">
            <Link
              href="/"
              className="font-serif text-xl text-burgundy font-bold focus:outline-none focus:ring-2 focus:ring-burgundy/30 rounded"
              aria-label="Legacy Letters home"
            >
              Legacy Letters
            </Link>
            <SaveExitButton />
          </div>
        </header>

        <main id="wizard-content" className="flex-1 flex flex-col items-center px-6 py-10">
          <WizardProgress />
          <div className="w-full max-w-2xl">
            {children}
          </div>
        </main>
      </div>
    </WizardProvider>
  );
}
