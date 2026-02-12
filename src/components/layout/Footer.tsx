import Link from "next/link";
import { Instagram, Facebook, MapPin, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-secondary text-white py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif font-bold">GODDESS AESTHETICS</h3>
                        <p className="text-gray-400 max-w-xs">
                            Enhancing natural beauty, simplifying routines, and boosting confidence through holistic aesthetic services.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-serif text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link href="#services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
                            <li><Link href="#products" className="text-gray-400 hover:text-white transition-colors">Products</Link></li>
                            <li><Link href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-serif text-lg mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                                <span>
                                    72 West Road<br />
                                    Avondale West<br />
                                    Harare
                                </span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Phone className="w-5 h-5 shrink-0" />
                                <span>+27 76 110 0968</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-serif text-lg mb-6">Follow Us</h4>
                        <div className="flex gap-4">
                            <a href="https://instagram.com/goddessaesthetics.zim" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Goddess Aesthetics. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
