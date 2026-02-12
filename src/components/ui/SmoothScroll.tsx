"use client";

import { ReactNode, useEffect, useState, createContext, useContext } from "react";
import Lenis from "lenis";

const LenisContext = createContext<{ lenis: Lenis | null }>({ lenis: null });

export const useLenis = () => useContext(LenisContext);

export function SmoothScroll({ children }: { children: ReactNode }) {
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {
        // Force scroll to top on reload/load
        if (typeof window !== "undefined") {
            window.history.scrollRestoration = "manual";
            window.scrollTo(0, 0);
        }

        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            // smoothWheel: true, // Default is true in v1
            // smoothTouch: false, // Default
        });

        setLenis(lenisInstance);

        // Ensure Lenis starts at top
        lenisInstance.scrollTo(0, { immediate: true });

        function raf(time: number) {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenisInstance.destroy();
            setLenis(null);
        };
    }, []);

    return (
        <LenisContext.Provider value={{ lenis }}>
            {children}
        </LenisContext.Provider>
    );
}
