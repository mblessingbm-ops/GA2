import type { Metadata } from "next";
import { Playfair_Display, Lato, Oswald } from "next/font/google"; // Oswald for that bold, editorial sans
import "./globals.css";
import MouseTracker from "./components/MouseTracker";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-body",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-editorial", // New editorial font variable
  display: "swap",
});

export const metadata: Metadata = {
  title: "Goddess Aesthetics Beauty Studio",
  description: "Full-service beauty studio in Avondale West, Harare. Laser hair removal, waxing, brows, lashes, and facials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lato.variable} ${oswald.variable}`}>
        <MouseTracker />
        {children}
      </body>
    </html>
  );
}
