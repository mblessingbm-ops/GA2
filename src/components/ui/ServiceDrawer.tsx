"use client";

import { X, Sparkles, Plus } from "lucide-react";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useLenis } from "@/components/ui/SmoothScroll";
import { services } from "@/data/services";

interface ServiceDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ServiceDrawer({ isOpen, onClose }: ServiceDrawerProps) {
    const { addItem } = useCart();
    const { lenis } = useLenis();

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
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white text-secondary">
                            <div>
                                <h2 className="text-2xl font-serif font-bold">Quick Book</h2>
                                <p className="text-sm text-gray-500">Select services to add to your appointment</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto" data-lenis-prevent>
                            <div className="p-6 space-y-8">
                                {services.map((service) => (
                                    <div key={service.id} className="space-y-4">
                                        <div className="flex items-center gap-2 sticky top-0 bg-white/95 backdrop-blur py-3 z-10 border-b border-gray-100">
                                            <Sparkles className="w-5 h-5 text-accent" />
                                            <h3 className="font-serif text-xl font-bold text-secondary">
                                                {service.title}
                                            </h3>
                                        </div>

                                        {!service.isComingSoon ? (
                                            <div className="grid gap-3">
                                                {service.priceList ? (
                                                    service.priceList.map((item) => (
                                                        <div
                                                            key={item.name}
                                                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group"
                                                        >
                                                            <span className="font-medium text-gray-700">{item.name}</span>
                                                            <div className="flex items-center gap-4">
                                                                <span className="font-serif font-bold text-secondary">{item.price}</span>
                                                                <button
                                                                    onClick={() => addItem({
                                                                        id: `${service.id}-${item.name.replace(/\s+/g, '-').toLowerCase()}`,
                                                                        name: `${item.name} (${service.title})`,
                                                                        price: parseFloat(item.price.replace(/[^0-9.]/g, '')),
                                                                        image: service.image,
                                                                        category: service.title
                                                                    })}
                                                                    className="p-1.5 bg-secondary text-white rounded-full hover:bg-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                                                    title="Add to cart"
                                                                >
                                                                    <Plus className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="p-4 text-center text-gray-500 italic">
                                                        Pricing varies. Please consult for details.
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-200 text-center text-gray-500">
                                                Services coming soon
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
