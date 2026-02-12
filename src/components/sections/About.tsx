"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

function ParallaxImage({ src, alt, className, delay = 0, yOffset = 30 }: { src: string, alt: string, className?: string, delay?: number, yOffset?: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, yOffset]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <motion.div
            ref={ref}
            className={`relative overflow-hidden ${className}`}
            style={{ y, opacity }}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
            />
        </motion.div>
    );
}

import { Sparkles, Leaf, Crown } from "lucide-react";

const philosophyPoints = [
    {
        title: "Radiant",
        description: "We believe true beauty glows from within. Our treatments are designed to enhance your natural luminosity.",
        image: "/placeholder-radiant.jpg",
        icon: Sparkles,
        color: "text-primary",
        bgColor: "bg-primary/10"
    },
    {
        title: "Holistic",
        description: "Beauty is a balance of mind, body, and spirit. We approach every service with a focus on your overall well-being.",
        image: "/placeholder-holistic.jpg",
        icon: Leaf,
        color: "text-secondary",
        bgColor: "bg-secondary/10"
    },
    {
        title: "Confidence",
        description: "Empowerment starts with feeling good in your skin. We simplify your routine so you can conquer the world.",
        image: "/placeholder-confidence.jpg",
        icon: Crown,
        color: "text-accent",
        bgColor: "bg-accent/10"
    },
];

export function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                            More Than Just <br /><span className="text-secondary italic">Aesthetics</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            At Goddess Aesthetics, we are redefining the beauty standard in Harare. Founded on the principle that self-care should be invalidating, not a chore, our studio offers a sanctuary where advanced technology meets holistic wellness.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Specializing in laser hair removal and bespoke skin treatments, we are dedicated to providing results-driven services that respect your time and skin integrity.
                        </p>
                    </motion.div>

                    <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
                        <ParallaxImage src="/about/studio-interior.png" alt="Goddess Aesthetics Studio Interior" className="w-full h-full bg-gray-200" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {philosophyPoints.map((point, index) => {
                        const Icon = point.icon;
                        return (
                            <motion.div
                                key={point.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                            >
                                <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${point.bgColor} ${point.color}`}>
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className={`font-serif text-2xl font-bold mb-4 ${point.color}`}>{point.title}</h3>
                                <p className="text-gray-600">{point.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
