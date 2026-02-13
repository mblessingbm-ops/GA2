"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-[#36454F]/90 backdrop-blur-md shadow-sm border-b border-white/5">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="font-heading text-2xl font-bold text-white tracking-wide">
                    Goddess <span className="text-[#B76E79]">Aesthetics</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 items-center font-editorial text-sm tracking-widest text-gray-200">
                    <Link href="#services" className="hover:text-[#B76E79] transition-colors uppercase">Services</Link>
                    <Link href="#products" className="hover:text-[#B76E79] transition-colors uppercase">Products</Link>
                    <Link href="#contact" className="btn text-sm border-white text-white hover:bg-white hover:text-[#36454F]">Book Now</Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-[#36454F] border-t border-white/10 absolute w-full">
                    <div className="flex flex-col p-4 space-y-4 font-medium text-gray-200">
                        <Link href="#services" className="hover:text-[#B76E79]" onClick={() => setIsOpen(false)}>Services</Link>
                        <Link href="#products" className="hover:text-[#B76E79]" onClick={() => setIsOpen(false)}>Products</Link>
                        <Link href="#contact" className="btn text-center text-sm border-white text-white" onClick={() => setIsOpen(false)}>Book Now</Link>
                    </div>
                </div>
            )}
        </nav>
    );

}
