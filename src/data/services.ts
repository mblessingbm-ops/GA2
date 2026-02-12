export interface Service {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    image: string;
    price: string;
    isComingSoon?: boolean;
    priceList?: { name: string; price: string }[];
}

export const services: Service[] = [
    {
        id: "laser",
        title: "Laser Hair Removal",
        description: "Experience smooth, hair-free skin with our advanced laser technology.",
        fullDescription: "Our state-of-the-art laser hair removal treatments offer a permanent reduction in unwanted hair. Safe for all skin types, we use the latest technology to ensure comfort and effectiveness. Say goodbye to razors and waxing, and hello to silky smooth skin year-round.",
        image: "/services/laser.png",
        price: "From $10",
        priceList: [
            { name: "Lip", price: "$10" },
            { name: "Lip & Chin", price: "$20" },
            { name: "Under Arms", price: "$20" },
            { name: "Face", price: "$25" },
            { name: "Hands", price: "$30" },
            { name: "Half Legs", price: "$30" },
            { name: "Brazilian", price: "$35" },
            { name: "Full Legs", price: "$40" },
            { name: "Hollywood", price: "$40" },
        ]
    },
    {
        id: "waxing",
        title: "Premium Waxing",
        description: "Gentle and effective waxing services for a sleek finish.",
        fullDescription: "We use high-quality, hypoallergenic wax coupled with expert techniques to minimize discomfort and maximize smoothness. Our hygiene standards are impeccable, ensuring a safe and pleasant experience for intimate and body waxing.",
        image: "/services/waxing.png",
        price: "From $5",
        priceList: [
            { name: "Brows/Lip", price: "$5" },
            { name: "Lip & Chin", price: "$15" },
            { name: "Face", price: "$20" },
            { name: "Under Arms", price: "$15" },
            { name: "Hands", price: "$20" },
            { name: "Half Legs", price: "$20" },
            { name: "Full leg", price: "$30" },
            { name: "Brazilian", price: "$30" },
            { name: "Hollywood", price: "$35" },
        ]
    },
    {
        id: "brows-lashes",
        title: "Brows & Lashes",
        description: "Frame your face with perfectly sculpted brows and luscious lashes.",
        fullDescription: "From brow lamination and tinting to lash lifts and extensions, our artists customize the look to enhance your natural features. Wake up ready to go with eyes that sparkle and brows that define your beauty.",
        image: "/services/brows.png",
        price: "From $3",
        priceList: [
            { name: "Trimming", price: "$3" },
            { name: "Lash Removal", price: "$5" },
            { name: "Brow Tinting", price: "$15" },
            { name: "Hybrid Lashes", price: "$20" },
            { name: "Classic Lashes", price: "$30" },
            { name: "Volume Lashes", price: "$45" },
            { name: "Touch Up", price: "$100" },
            { name: "Ombre Powder", price: "$150" },
        ]
    },
    {
        id: "facials",
        title: "Holistic Facials",
        description: "Rejuvenate your skin with our customized facial treatments.",
        fullDescription: "Our facials are not just skin deep; they are a relaxation journey. We use premium products and techniques like lymphatic drainage and LED light therapy to target acne, aging, or dehydration, leaving your skin radiant and glowing.",
        image: "/services/waxing.png", // Temporary fallback
        price: "From $20",
        priceList: [
            { name: "Dermaplaning", price: "$20" },
            { name: "Mini Facial", price: "$30" },
            { name: "K Beauty Facial", price: "$50" },
        ]
    },
    {
        id: "gift-voucher",
        title: "Gift Vouchers",
        description: "Give the gift of beauty and relaxation.",
        fullDescription: "Treat your loved ones to a customized experience at Goddess Aesthetics. Perfect for birthdays, anniversaries, or just because. Choose an amount and let them select their preferred treatment.",
        image: "/services/gift-card.png", // We'll need a placeholder or specific image
        price: "From $20",
        // No priceList, logic will handle this differently
    },
];
