import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/hooks/use-theme";
import { AdminAuthProvider } from "@/hooks/use-admin-auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Opportunity OS - Discover Life-Changing Opportunities",
  description:
    "AI-powered platform helping students, teenagers, and young professionals discover scholarships, internships, hackathons, competitions, and more.",
  keywords: [
    "scholarships",
    "internships",
    "hackathons",
    "competitions",
    "students",
    "India",
    "opportunities",
    "career",
  ],
  openGraph: {
    title: "Opportunity OS",
    description: "Discover life-changing opportunities tailored for you",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <AdminAuthProvider>{children}</AdminAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
