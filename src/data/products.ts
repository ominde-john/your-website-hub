export type Product = {
  id: number;
  name: string;
  category: string;
  priceKsh: number;
  originalPriceKsh?: number;
  rating: number;
  reviews: number;
  type: "electronics" | "software";
  description: string;
  features: string[];
};

export const products: Product[] = [
  {
    id: 1,
    name: "Gaming Laptop Pro",
    category: "Laptops",
    priceKsh: 185000,
    originalPriceKsh: 215000,
    rating: 4.8,
    reviews: 156,
    type: "electronics",
    description:
      "The Gaming Laptop Pro is designed for high-performance gaming, software development, and intensive multitasking. Built with advanced cooling and powerful hardware, it delivers smooth gameplay and productivity.",
    features: [
      "High-performance processor",
      "Dedicated graphics card",
      "Advanced cooling system",
      "RGB backlit keyboard",
      "Perfect for gaming & development",
    ],
  },
  {
    id: 2,
    name: 'Ultra HD Monitor 27"',
    category: "Monitors",
    priceKsh: 65000,
    originalPriceKsh: 78000,
    rating: 4.6,
    reviews: 89,
    type: "electronics",
    description:
      "A stunning 27-inch Ultra HD monitor with crystal-clear visuals, ideal for designers, developers, and content creators.",
    features: [
      "4K Ultra HD resolution",
      "27-inch display",
      "Eye-care technology",
      "Slim bezel design",
    ],
  },
  {
    id: 3,
    name: "Wireless Noise-Canceling Headphones",
    category: "Audio",
    priceKsh: 29000,
    originalPriceKsh: 36000,
    rating: 4.9,
    reviews: 234,
    type: "electronics",
    description:
      "Premium wireless headphones with active noise cancellation for immersive sound, calls, and entertainment.",
    features: [
      "Active noise cancellation",
      "Long battery life",
      "Crystal clear sound",
      "Comfortable over-ear design",
    ],
  },
  {
    id: 4,
    name: "Enterprise Security Suite",
    category: "Security",
    priceKsh: 43000,
    originalPriceKsh: 58000,
    rating: 4.9,
    reviews: 89,
    type: "software",
    description:
      "An enterprise-grade security solution protecting your systems from malware, cyber threats, and data breaches.",
    features: [
      "Advanced threat protection",
      "Real-time monitoring",
      "Secure firewall",
      "1-year license included",
    ],
  },
  {
    id: 5,
    name: "AI Code Assistant",
    category: "Development",
    priceKsh: 7200,
    originalPriceKsh: 11500,
    rating: 4.9,
    reviews: 523,
    type: "software",
    description:
      "Boost your coding productivity using AI-powered suggestions, auto-completion, and intelligent debugging.",
    features: [
      "AI-powered coding assistance",
      "Supports multiple languages",
      "Improves productivity",
      "Monthly subscription",
    ],
  },
];

