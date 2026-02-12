"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Video Background Placeholder */}
            <div className="absolute inset-0 bg-secondary/30 z-10 mix-blend-multiply" />
            <div className="absolute inset-0 bg-neutral-200">
                {/* Placeholder for Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    poster="/hero-bg-poster.jpg"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                >
                    <source src="/hero-bg.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-6"
                >
                    <span className="text-accent text-xs md:text-sm font-medium tracking-[0.2em] uppercase">
                        [ PROTOCOL: FULL–SERVICE BEAUTY STUDIO ]
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold tracking-widest text-primary mb-4"
                    style={{ textShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                >
                    GODDESS
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-white text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto mb-10"
                >
                    THE STANDARD OF RADIANCE.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <a href="#services">
                        <MagneticButton className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full text-white font-medium hover:bg-white hover:text-secondary transition-all duration-300 transform hover:scale-105">
                            Discover Our Services
                        </MagneticButton>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
