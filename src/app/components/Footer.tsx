import Link from "next/link";
import { Instagram, Facebook, Twitter, ShoppingBag, MapPin, Clock, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer>


            {/* Main Footer Content */}
            <div className="bg-[#36454F] text-[#FFFFFF] pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {/* Brand & Contact Info */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-heading font-bold text-[#B76E79]">Goddess Aesthetics</h3>
                                <div className="text-[#D1D5DB] max-w-sm leading-relaxed text-sm space-y-2">
                                    <h4 className="font-bold text-[#FFFFFF]">Visit Our Studio</h4>
                                    <p>
                                        We are conveniently located in Avondale West. Book your appointment today and let us help you achieve your beauty goals.
                                        See our contact details below.
                                    </p>
                                </div>
                            </div>

                            {/* Contact Details moved from About.tsx */}
                            <div className="space-y-4 pt-4 border-t border-gray-600/50">
                                <div className="flex items-start gap-3">
                                    <MapPin className="text-[#B76E79] w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-[#FFFFFF] uppercase tracking-wider text-xs mb-1">Location</h4>
                                        <p className="text-[#D1D5DB] text-sm font-light">72 West Road, Avondale West, Harare</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="text-[#B76E79] w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-[#FFFFFF] uppercase tracking-wider text-xs mb-1">Opening Hours</h4>
                                        <p className="text-[#D1D5DB] text-sm font-light">Mon - Sat: 8:00 AM - 5:00 PM</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="text-[#B76E79] w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-[#FFFFFF] uppercase tracking-wider text-xs mb-1">Contact</h4>
                                        <p className="text-[#D1D5DB] text-sm font-light">+263 77 123 4567</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-bold">Quick Links</h4>
                            <ul className="space-y-2 text-[#D1D5DB]">
                                <li><Link href="#services" className="hover:text-[#B76E79] transition-colors">Services</Link></li>
                                <li><Link href="#products" className="hover:text-[#B76E79] transition-colors">Products</Link></li>
                                <li><Link href="#contact" className="hover:text-[#B76E79] transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Socials */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-bold">Follow Us</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#B76E79] transition-colors">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#B76E79] transition-colors">
                                    <Facebook size={20} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#B76E79] transition-colors">
                                    <Twitter size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
                        <p>&copy; {new Date().getFullYear()} Goddess Aesthetics Beauty Studio. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
