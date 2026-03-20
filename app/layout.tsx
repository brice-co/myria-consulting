import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://myriaconsulting.com"),
  title: {
    default: "Myria Consulting — AI Platforms & Voice Agents",
    template: "%s | Myria Consulting",
  },
  description:
    "Myria Consulting designs and builds AI platforms for real organizations. We start with AI Voice Agents and scale toward secure, multi-tenant, governed AI systems.",
  applicationName: "Myria Consulting",
  authors: [{ name: "Myria Consulting" }],
  generator: "Next.js",
  keywords: [
    "AI Consulting",
    "AI Voice Agent",
    "Agentic AI",
    "AI Platform",
    "Multi-tenant AI",
    "Enterprise AI",
    "AI Governance",
    "AI Architecture",
    "Next.js AI",
  ],

  openGraph: {
    type: "website",
    siteName: "Myria Consulting",
    title: "Myria Consulting — AI Platforms & Voice Agents",
    description:
      "We help organizations move from AI experiments to production-ready AI platforms. Voice Agents, governance, security, and scale built in.",
    url: "https://myriaconsulting.com",
    images: [
      {
        url: "/og-image.png", // you can add later
        width: 1200,
        height: 630,
        alt: "Myria Consulting — AI Platforms",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Myria Consulting — AI Platforms & Voice Agents",
    description:
      "From AI Voice Agents to full AI platforms. Designed for scale, governance, and real-world use.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark"
      style={{ colorScheme: "dark" }}   // ✅ MATCHES SERVER OUTPUT
    >
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          min-h-screen
          bg-black
          text-white
          antialiased
        `}
      >
          {/* Global Navbar */}
          <Navbar />
          
        {children}
          {/* Global Footer */}
          <Footer />
      </body>
      <Script
      src="https://assets.calendly.com/assets/external/widget.js"
      strategy="afterInteractive"
      />
    </html>
  );
}
