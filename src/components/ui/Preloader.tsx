"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Lock scroll
        document.body.style.overflow = "hidden";
        if (typeof window !== "undefined") {
            window.scrollTo(0, 0);
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
            // Unlock scroll
            document.body.style.overflow = "";
            // Ensure we are at the top when the content reveals
            if (typeof window !== "undefined") {
                window.scrollTo(0, 0);
            }
        }, 3000); // 3.0s duration

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-neutral-900 text-white"
                >
                    <div className="text-center">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 1.5,
                                ease: "easeOut",
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                            className="font-serif text-3xl md:text-5xl font-bold tracking-widest"
                        >
                            GODDESS <br />
                            <span className="text-xl md:text-3xl font-light italic">AESTHETICS</span>
                        </motion.h1>

                        <motion.div
                            className="mt-6 h-1 w-24 bg-white/20 mx-auto rounded-full overflow-hidden"
                        >
                            <motion.div
                                className="h-full bg-white"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
