"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import MagneticButton from "./MagneticButton";

export default function Hero() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Mouse Aura Effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Update mouse position relative to the window
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section ref={ref} className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-[#36454F] cursor-none">
            {/* Micro-Copy: Top Right */}
            <div className="absolute top-24 right-6 md:top-8 md:right-10 z-30 mix-blend-plus-lighter">
                <p className="text-[#D4AF37] font-editorial text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-80">
                    // Authentic Beauty Protocol V.26
                </p>
            </div>

            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-60" // Reduced opacity to blend with charcoal
                >
                    {/* Slow motion skin texture / beauty video */}
                    <source src="https://videos.pexels.com/video-files/2795405/2795405-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                </video>
                {/* Dark Charcoal Overlay for "Matte" feel */}
                <div className="absolute inset-0 bg-[#36454F]/70 mix-blend-multiply"></div>
            </div>

            {/* 🌟 The Aura: Mouse-following Rose Gold Glow */}
            <motion.div
                className="absolute top-0 left-0 w-[600px] h-[600px] bg-radial-gradient from-[#B76E79]/40 to-transparent blur-3xl pointer-events-none z-10 mix-blend-screen"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                    background: "radial-gradient(circle, rgba(183,110,121,0.5) 0%, rgba(183,110,121,0) 70%)"
                }}
            />

            {/* Content w/ Parallax */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-20 max-w-7xl mx-auto px-4 flex flex-col items-center justify-center h-full"
            >
                {/* Massive Typography */}
                <h1 className="font-heading text-6xl md:text-[8rem] lg:text-[10rem] leading-[0.85] text-[#B76E79] tracking-widest uppercase mb-12 mix-blend-normal relative flex flex-col items-center">
                    <span>Goddess</span>
                    <span className="text-4xl md:text-[4rem] lg:text-[5rem] tracking-[0.5em] text-[#FDE2E4] mt-2 md:mt-4 opacity-90">
                        Aesthetics
                    </span>

                    {/* Subtle Gold Outline/Shadow for depth - Goddess only for impact */}
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 text-transparent stroke-text-gold opacity-30 select-none blur-sm whitespace-nowrap" aria-hidden="true">Goddess</span>
                </h1>

                {/* Subtext */}
                <p className="text-[#FDE2E4] font-editorial text-lg md:text-xl tracking-[0.2em] font-light max-w-lg mx-auto mb-16 opacity-90">
                    Where advanced science meets <span className="text-[#D4AF37] italic">tranquil luxury</span>.
                </p>

                {/* Solid Rose Gold Magnetic Button */}
                <div className="relative group">
                    <MagneticButton
                        href="#contact"
                        className="bg-[#B76E79] text-white px-10 py-4 rounded-none border border-transparent 
                                 hover:bg-[#B76E79] hover:text-[#36454F] hover:shadow-[0_0_30px_#D4AF37] 
                                 font-heading text-xl uppercase tracking-widest"
                    >
                        Book Your Glow
                    </MagneticButton>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20 text-[#D4AF37]/60">
                <span className="text-[10px] uppercase tracking-[0.3em] font-editorial">Scroll to Reveal</span>
            </div>
        </section>
    );
}
