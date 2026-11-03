import type { Metadata } from "next";
import { Syne, Manrope, Inter, Poppins, Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-ui",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-cta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Internship Drive | E-Cell BITS Pilani Hyderabad",
    template: "%s | Internship Drive",
  },
  description:
    "Connecting students across India with startup internships. A flagship initiative by E-Cell, BITS Pilani Hyderabad Campus.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "Internship Drive | E-Cell BPHC",
    description:
      "Connecting students across India with startup internships through the Launchpad program.",
    type: "website",
  },
  themeColor: "#0C233C",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
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
      className={`${syne.variable} ${manrope.variable} ${inter.variable} ${poppins.variable} ${outfit.variable}`}
    >
      <body className="min-h-screen bg-bg-primary text-text-primary antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1a1a1a",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "1rem",
              fontSize: "14px",
              fontFamily: "var(--font-body)",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#000000",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#000000",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
