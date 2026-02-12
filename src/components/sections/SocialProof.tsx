"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const socialImages = [
    "/placeholder-social-1.jpg",
    "/placeholder-social-2.jpg",
    "/placeholder-social-3.jpg",
    "/placeholder-social-4.jpg",
    "/placeholder-social-5.jpg",
    "/placeholder-social-6.jpg",
];

export function SocialProof() {
    return (
        <section className="py-24 bg-neutral-900 text-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">Real Results, Real Confidence</h2>
                    <p className="text-gray-400">Join our community of glowing goddesses.</p>
                </div>
                <MagneticButton className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:border-accent hover:bg-white hover:text-secondary transition-all duration-300">
                    <a href="https://instagram.com/goddessaesthetics.zim" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Instagram className="w-5 h-5 text-accent" /> Follow us @goddessaesthetics.zim
                    </a>
                </MagneticButton>
            </div>

            {/* Marquee */}
            <div className="relative w-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-900 to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-900 to-transparent z-10" />

                <div className="flex gap-6 w-max">
                    {/* Duplicated for infinite scroll effect */}
                    {[...socialImages, ...socialImages, ...socialImages].map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ x: 0 }}
                            animate={{ x: "-100%" }}
                            transition={{
                                duration: 30,
                                repeat: Infinity,
                                ease: "linear",
                                repeatType: "loop"
                            }}
                            className="w-64 h-64 md:w-80 md:h-80 bg-neutral-800 rounded-xl overflow-hidden shrink-0"
                        >
                            <div className="w-full h-full flex items-center justify-center text-gray-500 bg-neutral-800">
                                [Social Image {index % socialImages.length + 1}]
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
