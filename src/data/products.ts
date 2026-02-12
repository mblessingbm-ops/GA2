export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
}

export const products: Product[] = [
    {
        id: 1,
        name: "Under Arm Lightening Roll-On",
        category: "Best Seller",
        price: 25.00,
        image: "/products/roll-on.png",
        description: "Our #1 best-selling formula for brightening and smoothing underarm skin."
    },
    {
        id: 2,
        name: "Radiance Serum",
        category: "Skincare",
        price: 45.00,
        image: "/products/radiance-serum.png",
        description: "A potent vitamin C serum to boost glow and even out skin tone."
    },
    {
        id: 3,
        name: "Hydrating Night Cream",
        category: "Skincare",
        price: 38.00,
        image: "/products/night-cream.png",
        description: "Deeply restorative cream that works while you sleep."
    },
    {
        id: 4,
        name: "Exfoliating Body Scrub",
        category: "Body Care",
        price: 32.00,
        image: "/products/body-scrub.png",
        description: "Buff away dead skin cells to reveal smoother, softer skin."
    },
    {
        id: 5,
        name: "Soothing Aloe Gel",
        category: "Post-Care",
        price: 20.00,
        image: "/products/aloe-gel.png",
        description: "Perfect for post-laser or waxing care to calm and hydrate."
    },
    {
        id: 6,
        name: "Lash Growth Serum",
        category: "Eyes",
        price: 55.00,
        image: "/products/lash-serum.png",
        description: "Enhance your natural lashes with our peptide-rich formula."
    },
];
