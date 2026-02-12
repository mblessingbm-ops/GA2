"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Image from "next/image";

import { useLenis } from "@/components/ui/SmoothScroll";
import { useEffect, useState } from "react";

export function CartDrawer() {
    const { isCartOpen, toggleCart, items, removeItem, updateQuantity, cartTotal } = useCart();
    const { lenis } = useLenis();
    const [view, setView] = useState<'cart' | 'booking'>('cart');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: ''
    });

    // Reset view when cart closes
    useEffect(() => {
        if (!isCartOpen) {
            // Small delay to allow transition to finish
            const timer = setTimeout(() => setView('cart'), 300);
            return () => clearTimeout(timer);
        }
    }, [isCartOpen]);

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault();

        const subject = `Appointment Request: ${formData.name}`;
        const itemsList = items.map(item => {
            let details = '';
            if (item.details) {
                details = `\n   - To: ${item.details.recipientName}\n   - Msg: ${item.details.message || 'N/A'}`;
            }
            return `- ${item.name} x${item.quantity} ($${(item.price * item.quantity).toFixed(2)})${details}`;
        }).join('\n');
        const body = `Name: ${formData.name}
Phone: ${formData.phone}
Preferred Date: ${new Date(formData.date).toLocaleString()}

Requested Services:
${itemsList}

Total Est: $${cartTotal.toFixed(2)}

Please confirm my appointment.`;

        window.location.href = `mailto:tbianca2008@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    // Prevent scrolling when drawer is open
    useEffect(() => {
        if (isCartOpen) {
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
    }, [isCartOpen, lenis]);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 flex items-center justify-between border-b border-gray-100">
                            <h2 className="text-xl font-serif font-bold text-secondary flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" /> Your Cart
                            </h2>
                            <button
                                onClick={toggleCart}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Items */}
                        <div
                            className="flex-1 overflow-y-auto p-6 space-y-6"
                            data-lenis-prevent
                        >
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                        <ShoppingBag className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-medium text-lg">Your cart is empty</p>
                                        <p className="text-gray-500">Looks like you haven't added anything yet.</p>
                                    </div>
                                    <MagneticButton
                                        onClick={toggleCart}
                                        className="mt-4 px-6 py-2 bg-secondary text-white rounded-full text-sm font-medium hover:bg-primary transition-colors"
                                    >
                                        Continue Shopping
                                    </MagneticButton>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex gap-4"
                                    >
                                        <div className="relative w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                                                <p className="text-sm text-gray-500">{item.category}</p>
                                                <p className="text-accent font-medium mt-1">${item.price.toFixed(2)}</p>
                                                {item.details && (
                                                    <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100">
                                                        <p><span className="font-semibold">To:</span> {item.details.recipientName}</p>
                                                        {item.details.message && <p className="italic mt-1 line-clamp-2">"{item.details.message}"</p>}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center border border-gray-200 rounded-full">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 px-2 hover:text-primary transition-colors disabled:opacity-50"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 px-2 hover:text-primary transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-xs text-gray-400 hover:text-red-500 transition-colors underline"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && view === 'cart' ? (
                            <div className="p-6 border-t border-gray-100 bg-gray-50">
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <p className="text-xs text-center text-gray-500">No payment required now. Pay at the studio.</p>
                                </div>
                                <MagneticButton
                                    onClick={() => setView('booking')}
                                    className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                                >
                                    Book Appointment <ArrowRight className="w-4 h-4" />
                                </MagneticButton>
                                <button
                                    onClick={toggleCart}
                                    className="w-full mt-3 py-3 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : view === 'booking' && items.length > 0 ? (
                            <div className="p-6 border-t border-gray-100 bg-gray-50 flex-1 overflow-y-auto">
                                <h3 className="font-serif text-lg font-bold text-secondary mb-4">Your Details</h3>
                                <form onSubmit={handleBooking} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            required
                                            type="tel"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+263 7..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date & Time</label>
                                        <input
                                            required
                                            type="datetime-local"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>

                                    <div className="pt-4 space-y-3">
                                        <MagneticButton
                                            className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                                        >
                                            Send Request via Email <ArrowRight className="w-4 h-4" />
                                        </MagneticButton>
                                        <button
                                            type="button"
                                            onClick={() => setView('cart')}
                                            className="w-full py-3 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                        >
                                            Back to Cart
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : null}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
