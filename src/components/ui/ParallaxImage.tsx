"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ParallaxImage({ src, alt, className, delay = 0, yOffset = 30 }: { src: string, alt: string, className?: string, delay?: number, yOffset?: number }) {
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
