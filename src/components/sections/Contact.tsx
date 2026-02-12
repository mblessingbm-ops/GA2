import { MagneticButton } from "@/components/ui/MagneticButton";

export function Contact() {
    return (
        <section id="contact" className="py-24 bg-white relative">
            <div className="container mx-auto px-4 md:px-6 z-10 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-gray-50 rounded-3xl overflow-hidden shadow-sm">

                    {/* Map Embed */}
                    <div className="bg-gray-200 min-h-[400px] flex items-center justify-center text-gray-500">
                        <iframe
                            src="https://maps.google.com/maps?q=72+West+Road,+Avondale+West,+Harare&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="min-h-[400px]"
                        />
                    </div>

                    {/* Contact Form / Info */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <h2 className="text-3xl font-serif font-bold text-secondary mb-6">Visit Our Studio</h2>
                        <p className="text-gray-600 mb-8">
                            Ready to enhance your natural beauty? Book an appointment or visit us at our Avondale West studio.
                        </p>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                                <p className="text-gray-600">72 West Road, Avondale West, Harare</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">Hours</h3>
                                <p className="text-gray-600">Mon - Fri: 09:00 - 17:00</p>
                                <p className="text-gray-600">Sat: 09:00 - 14:00</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">Contact</h3>
                                <div className="flex items-center gap-3">
                                    <p className="text-gray-600">+27 76 110 0968</p>
                                    <MagneticButton className="px-4 py-1.5 bg-green-500 text-white text-sm font-medium rounded-full hover:bg-green-600 transition-colors">
                                        <a href="https://wa.me/27761100968" target="_blank" rel="noopener noreferrer">
                                            WhatsApp Us
                                        </a>
                                    </MagneticButton>
                                </div>
                            </div>
                        </div>

                        <MagneticButton className="mt-8 px-8 py-3 bg-secondary text-white font-medium rounded-full hover:bg-primary transition-colors w-full sm:w-auto">
                            Get Directions
                        </MagneticButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
