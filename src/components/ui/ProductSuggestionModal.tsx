"use client";

import { useState, useEffect } from "react";
import { X, Lightbulb, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useLenis } from "@/components/ui/SmoothScroll";

interface ProductSuggestionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ProductSuggestionModal({ isOpen, onClose }: ProductSuggestionModalProps) {
    const { lenis } = useLenis();
    const [formData, setFormData] = useState({
        productName: "",
        reason: "",
        customerName: ""
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            lenis?.stop();
        } else {
            // Only restart if no other modal is open (simplified here, assuming this is top-level)
            document.body.style.overflow = "";
            lenis?.start();
        }
    }, [isOpen, lenis]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const subject = `Product Suggestion: ${formData.productName}`;
        const body = `Hi Goddess Aesthetics Team,

I would love to see the following product in your store:

Product: ${formData.productName}
Why I want it: ${formData.reason}

Suggested by: ${formData.customerName || 'A Loyal Customer'}

Thanks!`;

        window.location.href = `mailto:tbianca2008@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        onClose();
        setFormData({ productName: "", reason: "", customerName: "" });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden"
                    >
                        <div className="relative p-6 md:p-8">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>

                            <div className="text-center mb-6">
                                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Lightbulb className="w-6 h-6 text-accent" />
                                </div>
                                <h2 className="text-2xl font-serif font-bold text-secondary mb-2">Reference A Product</h2>
                                <p className="text-gray-600 text-sm">Tell us what you'd love to see on our shelves!</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name / Brand</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g., Vitamin C Serum"
                                        value={formData.productName}
                                        onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Why would you love this?</label>
                                    <textarea
                                        required
                                        rows={3}
                                        placeholder="Tell us why it's a must-have..."
                                        value={formData.reason}
                                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="So we can thank you later!"
                                        value={formData.customerName}
                                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                <MagneticButton className="w-full py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-all flex items-center justify-center gap-2">
                                    Send Suggestion <Send className="w-4 h-4" />
                                </MagneticButton>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
