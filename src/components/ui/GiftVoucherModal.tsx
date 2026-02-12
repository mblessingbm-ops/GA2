"use client";

import { useState } from "react";
import { X, Gift, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useCart } from "@/context/CartContext";
import { useLenis } from "@/components/ui/SmoothScroll";
import { useEffect } from "react";

interface GiftVoucherModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PRESET_AMOUNTS = [50, 100, 150, 200, 250];

export function GiftVoucherModal({ isOpen, onClose }: GiftVoucherModalProps) {
    const { addItem } = useCart();
    const { lenis } = useLenis();
    const [amount, setAmount] = useState<number>(100);
    const [customAmount, setCustomAmount] = useState<string>("");
    const [recipientName, setRecipientName] = useState("");
    const [recipientEmail, setRecipientEmail] = useState("");
    const [message, setMessage] = useState("");

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

    const handleAddToCart = (e: React.FormEvent) => {
        e.preventDefault();
        const finalAmount = customAmount ? parseFloat(customAmount) : amount;

        if (!finalAmount || finalAmount <= 0) return;

        addItem({
            id: `voucher-${Date.now()}`,
            name: `Gift Voucher for ${recipientName || 'Friend'}`,
            price: finalAmount,
            image: "/services/gift-card.png", // Ensure this path exists or use a fallback
            category: "Gift Voucher",
            details: {
                recipientName,
                recipientEmail,
                message
            }
        });
        onClose();
        // Reset form
        setRecipientName("");
        setRecipientEmail("");
        setMessage("");
        setAmount(100);
        setCustomAmount("");
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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-[70] overflow-hidden"
                    >
                        <div className="relative p-6 md:p-8">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>

                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Gift className="w-8 h-8 text-primary" />
                                </div>
                                <h2 className="text-3xl font-serif font-bold text-secondary mb-2">Gift a Glow Up</h2>
                                <p className="text-gray-600">Create a personalized gift voucher for someone special.</p>
                            </div>

                            <form onSubmit={handleAddToCart} className="space-y-6">
                                {/* Amount Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Select Amount</label>
                                    <div className="flex flex-wrap gap-3 mb-3">
                                        {PRESET_AMOUNTS.map((val) => (
                                            <button
                                                key={val}
                                                type="button"
                                                onClick={() => { setAmount(val); setCustomAmount(""); }}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${amount === val && !customAmount
                                                        ? "bg-secondary text-white shadow-md transform scale-105"
                                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                    }`}
                                            >
                                                ${val}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            placeholder="Enter custom amount"
                                            value={customAmount}
                                            onChange={(e) => { setCustomAmount(e.target.value); setAmount(0); }}
                                            className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Recipient Details */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">To (Name)</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Recipient's Name"
                                            value={recipientName}
                                            onChange={(e) => setRecipientName(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Personal Message (Optional)</label>
                                        <textarea
                                            rows={3}
                                            placeholder="Add a sweet note..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                <MagneticButton className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                    Add to Cart - ${customAmount ? parseFloat(customAmount).toFixed(2) : amount.toFixed(2)}
                                </MagneticButton>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
