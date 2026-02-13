"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
}

export default function MagneticButton({ children, href, onClick, className = "" }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        // Pull factor - adjust for strength (higher divisor = weaker pull)
        setPosition({ x: middleX / 3, y: middleY / 3 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const isLink = !!href;
    const Component = isLink ? motion.a : motion.button;

    // Common props for both 'a' and 'button'
    const commonProps = {
        ref: ref as any,
        onMouseMove: handleMouse,
        onMouseLeave: reset,
        animate: { x: position.x, y: position.y },
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
        className: `relative overflow-hidden group ${className}`,
        // @ts-ignore
        href: isLink ? href : undefined,
        onClick: !isLink ? onClick : undefined
    };

    return (
        // @ts-ignore
        <Component {...commonProps}>
            {/* Glow Effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#B76E79]/0 via-[#B76E79]/10 to-[#B76E79]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
                transition={{ duration: 0.5 }}
            />

            {/* Content */}
            <span className="relative z-10">{children}</span>
        </Component>
    );
}
