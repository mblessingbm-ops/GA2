import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { GoddessGlowCursor } from "@/components/ui/GoddessGlowCursor";
import { Preloader } from "@/components/ui/Preloader";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Goddess Aesthetics | Radiant Beauty Studio in Harare",
  description: "Experience holistic beauty treatments at Goddess Aesthetics. Specializing in laser hair removal, waxing, facials, and brow styling in Avondale West, Harare.",
  keywords: ["Beauty Studio Harare", "Laser Hair Removal Zimbabwe", "Facials Avondale", "Waxing Harare", "Goddess Aesthetics", "Skincare Zimbabwe"],
  openGraph: {
    title: "Goddess Aesthetics | Radiant Beauty Studio",
    description: "Enhancing natural beauty, simplifying routines, and boosting confidence through holistic aesthetic services.",
    url: "https://goddessaesthetics.co.zw",
    siteName: "Goddess Aesthetics",
    locale: "en_US",
    type: "website",
  },
};

const fontSans = "font-sans";
const fontSerif = "font-serif";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{
          __html: `
          :root {
            --font-sans: 'Inter', sans-serif;
            --font-serif: 'Playfair Display', serif;
          }
        `}} />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col"
        )}
      >
        <CartProvider>
          <SmoothScroll>
            <Preloader />
            <GoddessGlowCursor />
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
