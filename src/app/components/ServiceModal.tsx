"use client";

import { X, Clock, DollarSign, Check } from "lucide-react";
import { useEffect, useState } from "react";

// Define the interface for the Service data
export interface ServiceData {
    title: string;
    description: string;
    icon: React.ReactNode;
    fullDescription?: string;
    price?: string;
    duration?: string;
    features?: string[];
    image?: string;
}

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: ServiceData | null;
}

export default function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    // Handle animation state
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Wait for animation
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    if (!service) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div
                className={`relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors z-10"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col md:flex-row h-full">
                    {/* Visual Side (Left/Top) */}
                    <div className="w-full md:w-2/5 bg-[#FFF5F7] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#DEA5A4]/20 to-transparent"></div>
                        <div className="relative z-10 p-6 rounded-full bg-white shadow-sm text-[#B76E79] mb-4">
                            {service.icon}
                        </div>
                        <h3 className="relative z-10 text-2xl font-heading font-medium text-secondary">{service.title}</h3>
                        <div className="relative z-10 mt-6 space-y-3 w-full">
                            {service.duration && (
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-white/60 py-2 px-4 rounded-full">
                                    <Clock size={16} className="text-[#B76E79]" />
                                    <span>{service.duration}</span>
                                </div>
                            )}
                            {service.price && (
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-white/60 py-2 px-4 rounded-full">
                                    <DollarSign size={16} className="text-[#B76E79]" />
                                    <span>{service.price}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content Side (Right/Bottom) */}
                    <div className="w-full md:w-3/5 p-8 md:p-10 space-y-6">
                        <div>
                            <h4 className="text-lg font-bold text-gray-800 mb-2">About this treatment</h4>
                            <p className="text-gray-600 leading-relaxed font-light">
                                {service.fullDescription || service.description}
                            </p>
                        </div>

                        {service.features && (
                            <div>
                                <h4 className="text-lg font-bold text-gray-800 mb-3">What to expect</h4>
                                <ul className="space-y-2">
                                    {service.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-600 text-sm">
                                            <Check size={16} className="text-[#B76E79] mt-0.5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="pt-4">
                            <a href="#contact" onClick={onClose} className="btn w-full text-center block">
                                Book Appointment
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
