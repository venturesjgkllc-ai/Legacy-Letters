import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Legacy Letters — Your Voice Today, Their Treasure Tomorrow",
  description:
    "Record a life story. We turn it into a beautiful heartfelt letter, delivered by email on your schedule. For birthdays, weddings, anniversaries, and graduations.",
  keywords: ["legacy letters", "heartfelt letters", "family letters", "timed letters", "personal letters"],
  openGraph: {
    title: "Legacy Letters",
    description: "Your stories, their keepsakes — letters from your life, timed perfectly for the big moments.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
