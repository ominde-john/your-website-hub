export type Product = {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  features: string[];
  type: "electronics" | "software";
};

export const products: Product[] = [
  {
    id: 1,
    name: "Gaming Laptop Pro",
    slug: "gaming-laptop-pro",
    category: "Laptops",
    price: 189999,
    originalPrice: 219999,
    rating: 4.8,
    reviews: 156,
    image: "/images/products/laptop.png",
    type: "electronics",
    description:
      "A high-performance gaming laptop powered by the latest Intel processor and RTX graphics. Ideal for gaming, AI workloads, and professional development.",
    features: [
      "Intel Core i7 Processor",
      "NVIDIA RTX Graphics",
      "16GB RAM",
      "1TB SSD Storage",
      "RGB Backlit Keyboard",
    ],
  },
  {
    id: 2,
    name: "Ultra HD Monitor 27\"",
    slug: "ultra-hd-monitor",
    category: "Monitors",
    price: 64999,
    originalPrice: 74999,
    rating: 4.6,
    reviews: 89,
    image: "/images/products/monitor.png",
    type: "electronics",
    description:
      "A stunning 27-inch Ultra HD monitor offering crystal-clear visuals, perfect for designers, developers, and gamers.",
    features: [
      "27-inch 4K Display",
      "144Hz Refresh Rate",
      "HDR Support",
      "Slim Bezel Design",
      "HDMI & DisplayPort",
    ],
  },
  {
    id: 3,
    name: "Wireless Noise-Canceling Headphones",
    slug: "wireless-headphones",
    category: "Audio",
    price: 29999,
    originalPrice: 34999,
    rating: 4.9,
    reviews: 234,
    image: "/images/products/headphones.png",
    type: "electronics",
    description:
      "Premium wireless headphones with advanced noise cancellation and immersive sound quality.",
    features: [
      "Active Noise Cancellation",
      "Bluetooth 5.3",
      "30-Hour Battery Life",
      "Fast Charging",
      "Comfort Fit Design",
    ],
  },
];
