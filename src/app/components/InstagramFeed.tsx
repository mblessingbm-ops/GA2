"use client";

import { Instagram } from "lucide-react";
import Image from "next/image";

// Placeholder images - using simple colored rectangles or placehold.co effectively
const images = [
    "https://placehold.co/300x300/FFE4E1/B76E79?text=Result+1",
    "https://placehold.co/300x300/FFF0F5/B76E79?text=Result+2",
    "https://placehold.co/300x300/E6E6FA/B76E79?text=Result+3",
    "https://placehold.co/300x300/F0FFF0/B76E79?text=Result+4",
    "https://placehold.co/300x300/F5F5DC/B76E79?text=Result+5",
    "https://placehold.co/300x300/FAF0E6/B76E79?text=Result+6",
];

// Duplicate images to create a seamless loop
const duplicatedImages = [...images, ...images, ...images];

export default function InstagramFeed() {
    return (
        <section className="py-20 bg-transparent border-t border-white/5 overflow-hidden">
            <div className="container mb-12 text-center space-y-4">
                <div className="flex items-center justify-center gap-3 text-[#B76E79]">
                    <Instagram size={28} />
                    <span className="uppercase tracking-[0.2em] font-medium text-sm">Follow Us</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-heading text-secondary">
                    Real Results, Real People
                </h2>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-gray-500 hover:text-[#B76E79] transition-colors mt-2"
                >
                    @goddess_aesthetics
                </a>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden">
                <div className="flex w-max animate-scroll">
                    {duplicatedImages.map((src, index) => (
                        <div
                            key={index}
                            className="w-[300px] h-[300px] flex-shrink-0 mx-4 relative group cursor-pointer overflow-hidden rounded-lg shadow-sm"
                        >
                            <img
                                src={src}
                                alt={`Instagram result ${index}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <Instagram className="text-white" size={32} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
