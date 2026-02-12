"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, ShoppingBag } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { ServiceDrawer } from "@/components/ui/ServiceDrawer";
import { AnimatePresence, motion } from "framer-motion";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "Products", href: "#products" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isServiceDrawerOpen, setIsServiceDrawerOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { toggleCart, cartCount, notification } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <CartDrawer />
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    scrolled
                        ? "bg-white/80 backdrop-blur-md shadow-sm py-4"
                        : "bg-transparent py-6"
                )}
            >
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                    <Link
                        href="/"
                        className={cn(
                            "text-2xl font-serif font-bold tracking-tight transition-colors",
                            scrolled ? "text-secondary" : "text-white"
                        )}
                    >
                        GODDESS AESTHETICS
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-accent relative group",
                                    scrolled ? "text-secondary" : "text-white/90"
                                )}
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}

                        {/* Cart Button */}
                        <button
                            onClick={toggleCart}
                            className={cn(
                                "relative p-2 hover:bg-white/10 rounded-full transition-colors",
                                scrolled ? "text-secondary hover:bg-gray-100" : "text-white"
                            )}
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <MagneticButton
                            className="px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                            onClick={() => setIsServiceDrawerOpen(true)}
                        >
                            Book Now
                        </MagneticButton>
                    </nav>

                    {/* Mobile Menu Toggle & Cart */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            onClick={toggleCart}
                            className={cn(
                                "relative p-2",
                                scrolled ? "text-secondary" : "text-white"
                            )}
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <button
                            className="p-2"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <X className={scrolled ? "text-gray-900" : "text-white"} />
                            ) : (
                                <Menu className={scrolled ? "text-gray-900" : "text-white"} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isOpen && (
                    <div className="fixed inset-0 top-[72px] bg-white z-40 md:hidden flex flex-col items-center justify-center gap-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-2xl font-serif text-gray-900"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <MagneticButton
                            className="px-8 py-3 bg-primary text-white rounded-full text-lg font-medium hover:bg-primary/90 transition-colors"
                            onClick={() => {
                                setIsOpen(false);
                                setIsServiceDrawerOpen(true);
                            }}
                        >
                            Book Now
                        </MagneticButton>
                    </div>
                )}
            </header>
            {/* Notification Toast */}
            {/* We can use AnimatePresence if imported, but simple conditional rendering works for now. 
                Let's import AnimatePresence from framer-motion if not present, checking imports... 
                "import { cn } from ..." "import { Menu... }" "import { MagneticButton }" 
                We need to add AnimatePresence to imports or just use basic classes. 
                Wait, Header doesn't import motion. Let's add it. */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: -20, x: "-50%" }}
                        className="fixed top-24 left-1/2 z-[100] bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
                    >
                        <ShoppingBag className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{notification}</span>
                    </motion.div>
                )}
            </AnimatePresence>
            <ServiceDrawer isOpen={isServiceDrawerOpen} onClose={() => setIsServiceDrawerOpen(false)} />
        </>
    );
}
