"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useCart } from "@/context/CartContext";
import { useLenis } from "@/components/ui/SmoothScroll";
import { Service, services } from "@/data/services";
import { GiftVoucherModal } from "@/components/ui/GiftVoucherModal";

export function Services() {
    const { addItem } = useCart();
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
    const { lenis } = useLenis(); // Ensure we have access to lenis if needed, though Modal handles it too.

    const handleServiceClick = (service: Service) => {
        if (service.id === 'gift-voucher') {
            setIsGiftModalOpen(true);
        } else {
            setSelectedService(service);
        }
    };

    return (
        <section id="services" className="py-24 bg-neutral-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-secondary font-medium tracking-wider uppercase text-sm text-gray-500 mb-2 block">
                        Our Expertise
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-4">
                        Curated Beauty Services
                    </h2>
                    <p className="text-gray-600 text-lg font-light">
                        Designed to simplify your routine and enhance your natural confidence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                            onClick={() => handleServiceClick(service)}
                        >
                            <div className="aspect-[4/5] overflow-hidden bg-gray-200 relative">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="font-serif text-2xl font-bold mb-2">{service.title}</p>
                                    <p className="text-sm text-white/90 mb-4 line-clamp-2">{service.description}</p>
                                    <p className="text-accent font-serif italic mb-4">{service.price}</p>
                                    <span className="inline-flex items-center text-sm font-medium text-accent underline underline-offset-4">
                                        {service.id === 'gift-voucher' ? 'Create Voucher' : 'View Details'} <ArrowRight className="w-4 h-4 ml-1" />
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 md:p-8 absolute inset-0 flex flex-col justify-end pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                                <h3 className="font-serif text-2xl font-bold text-white drop-shadow-md">{service.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <MagneticButton
                        className="px-8 py-3 bg-secondary/5 text-secondary border border-secondary/20 rounded-full font-medium hover:bg-secondary hover:text-white transition-all duration-300"
                        onClick={() => setSelectedService({
                            id: "coming-soon",
                            title: "Coming Soon",
                            description: "Expanding our menu to serve you better.",
                            fullDescription: "We are constantly evolving to meet your beauty needs. Stay tuned for these exciting additions to our service menu:",
                            image: "/placeholder-radiant.jpg", // Reusing an existing placeholder
                            price: "Launching Soon",
                            isComingSoon: true
                        } as any)}
                    >
                        More Services Coming Soon
                    </MagneticButton>
                </div>

                <Modal
                    isOpen={!!selectedService}
                    onClose={() => setSelectedService(null)}
                    title={selectedService?.title}
                >
                    <div className="space-y-6">
                        {!selectedService?.isComingSoon && (
                            <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden relative">
                                <Image
                                    src={selectedService?.image || ""}
                                    alt={selectedService?.title || ""}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        <div>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {selectedService?.fullDescription}
                            </p>

                            {selectedService?.priceList ? (
                                <div className="mt-6 space-y-3 bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    <h4 className="font-serif text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-accent" /> Service Menu
                                    </h4>
                                    <ul className="space-y-3">
                                        {selectedService.priceList.map((item) => (
                                            <li key={item.name} className="flex justify-between items-center text-sm border-b border-gray-200 last:border-0 pb-2 last:pb-0 border-dashed">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-600 font-medium">{item.name}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-secondary font-bold font-serif">{item.price}</span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            addItem({
                                                                id: `${selectedService.id}-${item.name.replace(/\s+/g, '-').toLowerCase()}`,
                                                                name: `${item.name} (${selectedService.title})`,
                                                                price: parseFloat(item.price.replace(/[^0-9.]/g, '')),
                                                                image: selectedService.image,
                                                                category: selectedService.title
                                                            });
                                                        }}
                                                        className="text-xs bg-secondary text-white px-2 py-1 rounded hover:bg-primary transition-colors"
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : null}

                            {selectedService?.isComingSoon ? (
                                <ul className="space-y-3 mt-6">
                                    {[
                                        "Professional Hair Installation",
                                        "Luxury Nail Services (Manicure & Pedicure)",
                                        "Relaxing Massages",
                                        "Body Contouring"
                                    ].map((item) => (
                                        <li key={item} className="flex items-center text-secondary font-medium">
                                            <Sparkles className="w-4 h-4 mr-2 text-accent" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="flex items-center justify-between text-lg font-medium text-gray-900 border-t border-gray-100 pt-4">
                                    <span>Start Price</span>
                                    <span className="font-serif">{selectedService?.price}</span>
                                </div>
                            )}
                        </div>

                        {!selectedService?.isComingSoon ? (
                            <MagneticButton className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                                Book Appointment
                            </MagneticButton>
                        ) : (
                            <MagneticButton className="w-full py-3 bg-secondary text-white rounded-lg font-medium cursor-not-allowed opacity-80">
                                Join Waitlist
                            </MagneticButton>
                        )}
                    </div>
                </Modal>
                <GiftVoucherModal isOpen={isGiftModalOpen} onClose={() => setIsGiftModalOpen(false)} />
            </div>
        </section>
    );
}
