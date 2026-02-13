"use client";

import { motion } from "framer-motion";

export default function Glow({ className = "" }: { className?: string }) {
    return (
        <div className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}>
            <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0.5, scale: 0.8 }}
                animate={{
                    opacity: [0.4, 0.6, 0.4],
                    scale: [0.95, 1.05, 0.95],
                    filter: ["blur(40px)", "blur(60px)", "blur(40px)"]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <div className="h-[300px] w-[300px] rounded-full bg-gradient-to-r from-[#B76E79]/20 to-[#DEA5A4]/20" />
            </motion.div>
        </div>
    );
}
