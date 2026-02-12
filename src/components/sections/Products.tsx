"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useState } from "react";
import { ProductDrawer } from "@/components/ui/ProductDrawer";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import Image from "next/image";

export function Products() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { addItem } = useCart();

    // Show first 3 products as featured
    const featuredProducts = products.slice(0, 3);

    return (
        <section id="products" className="py-24 bg-white">
            <ProductDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        <span className="text-secondary font-medium tracking-wider uppercase text-sm text-gray-500 mb-2 block">
                            Shop Essentials
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-4">
                            Extend Your Glow
                        </h2>
                        <p className="text-gray-600 text-lg font-light">
                            Our curated collection of products designed to compliment our treatments and deliver longer lasting results.
                        </p>
                    </div>
                    <MagneticButton
                        onClick={() => setIsDrawerOpen(true)}
                        className="hidden md:flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-full font-medium hover:bg-primary transition-colors"
                    >
                        View All Products <ArrowRight className="w-4 h-4" />
                    </MagneticButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-6">
                                <div className="absolute inset-0">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                {/* Quick Add Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    <MagneticButton
                                        onClick={() => addItem({
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            image: product.image,
                                            category: product.category
                                        })}
                                        className="w-full py-3 bg-white text-secondary font-medium rounded-lg shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ShoppingBag className="w-4 h-4 text-primary" /> Add to Cart
                                    </MagneticButton>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                                <h3 className="font-serif text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                                <p className="font-medium text-accent">${product.price.toFixed(2)}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <MagneticButton
                        onClick={() => setIsDrawerOpen(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-full font-medium hover:bg-primary transition-colors"
                    >
                        View All Products <ArrowRight className="w-4 h-4" />
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
}
