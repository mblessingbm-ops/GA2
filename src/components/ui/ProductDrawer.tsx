"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight, Lightbulb } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useCart } from "@/context/CartContext";
import { ProductSuggestionModal } from "@/components/ui/ProductSuggestionModal";
import { products as allProducts } from "@/data/products"; // Import centralized data

interface ProductDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

import { useLenis } from "@/components/ui/SmoothScroll";
import { useEffect } from "react";

export function ProductDrawer({ isOpen, onClose }: ProductDrawerProps) {
    const { addItem } = useCart();
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
    const { lenis } = useLenis();

    // Prevent scrolling when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            lenis?.stop();
        } else {
            document.body.style.overflow = "";
            lenis?.start();
        }
        return () => {
            document.body.style.overflow = "";
            lenis?.start();
        };
    }, [isOpen, lenis]);

    const categories = ["All", ...Array.from(new Set(allProducts.map(p => p.category)))];

    const filteredProducts = selectedCategory === "All"
        ? allProducts
        : allProducts.filter(p => p.category === selectedCategory);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-secondary/90 backdrop-blur-md z-[90]"
                    />

                    {/* Drawer Content */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="fixed inset-0 z-[91] flex flex-col bg-white md:rounded-t-[3rem] overflow-hidden md:mt-10"
                    >
                        {/* Header */}
                        <div className="p-6 md:p-10 flex items-center justify-between border-b border-gray-100">
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-secondary">Shop Collection</h2>
                                <p className="text-gray-500">Curated essentials for your beauty routine</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsSuggestionOpen(true)}
                                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium hover:bg-accent/20 transition-colors mr-2"
                                >
                                    <Lightbulb className="w-4 h-4" />
                                    Make a Suggestion
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors group"
                                >
                                    <X className="w-6 h-6 text-gray-500 group-hover:text-gray-900" />
                                </button>
                            </div>
                        </div>

                        {/* Mobile Suggestion Button (Visible only on small screens) */}
                        <div className="md:hidden px-6 pt-4">
                            <button
                                onClick={() => setIsSuggestionOpen(true)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent/10 text-accent rounded-xl text-sm font-medium hover:bg-accent/20 transition-colors"
                            >
                                <Lightbulb className="w-4 h-4" />
                                Suggest a Product
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="px-6 md:px-10 py-6 overflow-x-auto no-scrollbar">
                            <div className="flex gap-3">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${selectedCategory === cat
                                            ? "bg-secondary text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div
                            className="flex-1 overflow-y-auto px-6 md:px-10 pb-24"
                            data-lenis-prevent
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group bg-gray-50 rounded-2xl p-4 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="relative aspect-square bg-white rounded-xl overflow-hidden mb-4">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <MagneticButton
                                                    onClick={() => {
                                                        addItem({
                                                            id: product.id,
                                                            name: product.name,
                                                            price: product.price,
                                                            image: product.image,
                                                            category: product.category
                                                        });
                                                    }}
                                                    className="w-full py-3 bg-white/90 backdrop-blur text-secondary font-medium rounded-lg shadow-sm hover:bg-white flex items-center justify-center gap-2"
                                                >
                                                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                                                </MagneticButton>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-start mb-1">
                                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{product.category}</p>
                                                <p className="text-accent font-bold">${product.price.toFixed(2)}</p>
                                            </div>
                                            <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                                            <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Footer / Actions */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-10 w-full max-w-sm px-4">
                            <MagneticButton
                                onClick={onClose}
                                className="w-full py-4 bg-secondary text-white rounded-full font-medium shadow-xl hover:bg-primary transition-colors flex items-center justify-center"
                            >
                                Continue Browsing
                            </MagneticButton>
                        </div>
                    </motion.div>
                </>
            )}
            <ProductSuggestionModal isOpen={isSuggestionOpen} onClose={() => setIsSuggestionOpen(false)} />
        </AnimatePresence>
    );
}
