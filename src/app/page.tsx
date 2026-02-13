"use client";

import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import InstagramFeed from "./components/InstagramFeed";
import Footer from "./components/Footer";
import Glow from "./components/Glow";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />

      {/* Goddess Essentials (Shop) Section - Minimalist / High-End */}
      <section id="products" className="py-32 md:py-40 relative overflow-hidden">

        {/* Subtle, High-Quality Vector Glow - Positioned for balance */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none opacity-40">
          <Glow className="w-[800px] h-[800px]" />
        </div>

        <div className="container px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-20 md:gap-32">

            {/* Text Side - More Breathing Room + Entrance Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full md:w-5/12 space-y-8 text-center md:text-left"
            >
              <span className="text-[#D4AF37] tracking-[0.2em] uppercase text-xs font-semibold">Goddess Essentials</span>
              <h2 className="text-5xl md:text-6xl font-heading text-white leading-tight">
                Maintain Your Glow <br /> <span className="italic text-[#B76E79] font-light">At Home</span>
              </h2>
              <p className="text-gray-300 text-lg leading-loose font-light tracking-wide">
                We have custom-made products designed to compliment our services and ensure lasting results.
                Try our signature <strong className="font-medium text-[#D4AF37]">Under Arm Lightening Roll-On</strong> for brighter, smoother skin.
              </p>
              <div className="pt-8">
                <a href="#shop" className="group inline-flex items-center gap-3 text-white font-medium tracking-widest uppercase text-sm hover:text-[#D4AF37] transition-colors pb-1 border-b border-transparent hover:border-[#D4AF37]">
                  View All Products
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
              </div>
            </motion.div>

            {/* Visual Side - Product Showcase - Cleaner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="w-full md:w-6/12 relative flex justify-center md:justify-end"
            >
              <div className="relative z-10 w-full max-w-md">
                {/* Featured Product - Asymmetric Card - Minimize - Dark Theme */}
                <div className="bg-[#36454F] p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-[#D4AF37]/30 backdrop-blur-md">
                  <div className="absolute top-0 right-0 p-8">
                    <span className="text-[#D4AF37] text-[10px] font-bold px-3 py-1 uppercase tracking-widest border border-[#D4AF37] rounded-full">Bestseller</span>
                  </div>
                  {/* Empty space for "air" where image used to be, now just padding */}
                  <div className="pt-24 md:pt-32"></div>

                  <div className="flex justify-between items-end border-t border-[#D4AF37]/20 pt-6">
                    <div>
                      <h4 className="font-heading text-2xl text-white mb-1">Lightening Roll-On</h4>
                      <p className="text-[#D4AF37] text-xs tracking-widest uppercase">Signature Formula</p>
                    </div>
                    <p className="text-white font-medium text-lg">$15.00</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <InstagramFeed />
      <Footer />
    </main>
  );
}
