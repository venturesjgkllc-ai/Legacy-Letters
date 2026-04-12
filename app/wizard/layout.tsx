"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WizardProvider } from "@/lib/wizard-context";
import { cn } from "@/lib/utils";

const STEPS = [
  { path: "/wizard/event", label: "Event", num: 1 },
  { path: "/wizard/recipient", label: "Recipient", num: 2 },
  { path: "/wizard/sender", label: "You", num: 3 },
  { path: "/wizard/prompts", label: "Prompt", num: 4 },
  { path: "/wizard/record", label: "Record", num: 5 },
  { path: "/wizard/preview", label: "Letter", num: 6 },
];

function WizardProgress() {
  const pathname = usePathname();
  const currentIndex = STEPS.findIndex((s) => pathname.startsWith(s.path));

  return (
    <div className="w-full max-w-lg mx-auto mb-10" aria-label="Wizard progress">
      <div className="flex items-center justify-center gap-2 mb-3">
        {STEPS.map((step, i) => (
          <div key={step.path} className="flex items-center gap-2">
            <div
              className={cn(
                "transition-all duration-300 rounded-full",
                i === currentIndex && "w-8 h-3 bg-burgundy",
                i < currentIndex && "w-3 h-3 bg-burgundy/50",
                i > currentIndex && "w-3 h-3 bg-sepia-200"
              )}
              aria-label={`Step ${step.num}: ${step.label}${i === currentIndex ? " (current)" : i < currentIndex ? " (complete)" : ""}`}
            />
          </div>
        ))}
      </div>
      <p className="text-center font-sans text-sm text-sepia-400">
        Step {currentIndex + 1} of {STEPS.length}
        {currentIndex >= 0 && (
          <span className="ml-2 text-sepia-500 font-500">— {STEPS[currentIndex]?.label}</span>
        )}
      </p>
    </div>
  );
}

export default function WizardLayout({ children }: { children: React.ReactNode }) {
  return (
    <WizardProvider>
      <div className="min-h-screen bg-parchment flex flex-col">
        {/* Header */}
        <div className="py-6 px-6 flex items-center justify-between border-b border-sepia-100 bg-cream">
          <Link href="/" className="font-serif text-xl text-burgundy font-bold">
            Legacy Letters
          </Link>
          <Link href="/dashboard" className="font-sans text-sm text-sepia-500 hover:text-burgundy transition-colors">
            Save & exit
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center px-6 py-10">
          <WizardProgress />
          <div className="w-full max-w-2xl">
            {children}
          </div>
        </div>
      </div>
    </WizardProvider>
  );
}
