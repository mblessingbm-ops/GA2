"use client";

import { Zap, Star, Eye, Sparkles } from "lucide-react";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ServiceModal, { ServiceData } from "./ServiceModal";
import MagneticButton from "./MagneticButton";

const services: ServiceData[] = [
    {
        title: "Laser Hair Removal",
        description: "Experience silky smooth skin with our advanced, painless laser technology.",
        icon: <Zap size={40} className="text-[#B76E79] group-hover:text-white transition-colors duration-500" />,
        fullDescription: "Our state-of-the-art laser hair removal treatment offers a permanent solution for unwanted hair. Using the latest cooling technology, we ensure a comfortable and effective experience for all skin types.",
        price: "$50 - $300 per session",
        duration: "15 - 60 mins",
        features: ["Painless Application", "Suitable for All Skin Types", "Long-lasting Results", "Quick Sessions"],
        image: "/images/laser-hair-removal-example.jpg" // User provided example
    },
    {
        title: "Luxury Facials",
        description: "Customized treatments to rejuvenate, hydrate, and make your skin glow.",
        icon: <Star size={40} className="text-[#B76E79] group-hover:text-white transition-colors duration-500" />,
        fullDescription: "Indulge in our signature luxury facials, tailored to your skin's unique needs. From deep cleansing to anti-aging formulations, every step is designed to restore your natural radiance.",
        price: "$120 - $250",
        duration: "60 - 90 mins",
        features: ["Deep Cleansing", "Custom Masks", "Face & Neck Massage", "Premium Serums"],
        image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Placeholder
    },
    {
        title: "Brow & Lash Artistry",
        description: "Frame your face with precision shaping, tinting, and lifting services.",
        icon: <Eye size={40} className="text-[#B76E79] group-hover:text-white transition-colors duration-500" />,
        fullDescription: "Transform your look with our expert brow and lash services. Whether you want a natural lift or dramatic volume, our artists sculpt and style to perfection.",
        price: "$30 - $150",
        duration: "30 - 60 mins",
        features: ["Brow Lamination", "Lash Lift & Tint", "Precision Threading", "Hybrid Dye"],
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Placeholder
    },
    {
        title: "Advanced Skin Therapy",
        description: "Targeted solutions for acne, pigmentation, and anti-aging concerns.",
        icon: <Sparkles size={40} className="text-[#B76E79] group-hover:text-white transition-colors duration-500" />,
        fullDescription: "Achieve clinical results in a relaxing environment. Our advanced therapies use potent active ingredients and technology to address specific skin concerns effectively.",
        price: "$150 - $400",
        duration: "45 - 75 mins",
        features: ["Microneedling", "Chemical Peels", "LED Light Therapy", "Dermaplaning"],
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Placeholder
    }
];

export default function Services() {
    const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yBlob = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    return (
        <section ref={containerRef} id="services" className="section container relative">
            {/* ... (background blobs and title remain) ... */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedService(service)}
                        className={`group p-10 h-full rounded-none bg-[#2C3942] border border-[#D4AF37]/20 shadow-lg hover:shadow-[#B76E79]/20 hover:-translate-y-2 transition-all duration-500 text-center relative overflow-hidden cursor-pointer
                        ${index % 2 !== 0 ? 'md:mt-24' : ''} 
                        ${index === 1 || index === 3 ? 'lg:translate-y-12' : ''}
                        `}
                    >
                        {/* Background Image Reveal */}
                        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out">
                            <div className="absolute inset-0 bg-black/60 z-10"></div> {/* Dark Overlay */}
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000"
                            />
                        </div>

                        {/* Content */}
                        <div className="relative z-20">
                            <div className="absolute top-0 left-0 w-1 h-0 bg-[#D4AF37] group-hover:bg-[#B76E79] group-hover:h-full transition-all duration-500"></div>

                            <div className="mb-6 inline-flex p-4 rounded-full bg-white/5 group-hover:bg-white/10 group-hover:backdrop-blur-sm transition-colors duration-500">
                                {service.icon}
                            </div>

                            <h3 className="text-xl font-heading mb-3 text-white group-hover:text-[#FDE2E4] transition-colors duration-500">{service.title}</h3>
                            <p className="text-gray-300 text-sm leading-relaxed mb-6 group-hover:text-gray-100 transition-colors duration-500">{service.description}</p>

                            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] border-b border-[#D4AF37] pb-1 group-hover:text-[#B76E79] group-hover:border-[#B76E79] transition-all duration-500">
                                Quick View
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ... (rest of component) ... */}


            <div className="mt-20 text-center">
                <MagneticButton href="#contact" className="btn inline-flex items-center gap-2">
                    Book an Appointment
                </MagneticButton>
            </div>

            <ServiceModal
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
                service={selectedService}
            />
        </section>
    );
}
