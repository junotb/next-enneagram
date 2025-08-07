import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next Enneagram",
  description: "A Next.js application for Enneagram personality tests",
  keywords: ["Next.js", "Enneagram", "Personality Test"],
  manifest: "/manifest.json",
  themeColor: "#6a7282",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192.png",
  },
  appleWebApp: {
    capable: true,
    title: "Next Enneagram",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansKr.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
