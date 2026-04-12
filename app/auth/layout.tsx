import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-parchment flex flex-col">
      <div className="py-6 px-6 text-center">
        <Link href="/" className="font-serif text-2xl text-burgundy font-bold">
          Legacy Letters
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 pb-12">
        {children}
      </div>
      <footer className="py-6 text-center font-sans text-sm text-sepia-400">
        <Link href="/privacy" className="hover:text-burgundy mr-4">Privacy</Link>
        <Link href="/terms" className="hover:text-burgundy">Terms</Link>
      </footer>
    </div>
  );
}
