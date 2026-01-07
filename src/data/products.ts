export type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  features: string[];
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
};

export const products: Product[] = [
  {
    id: 1,
    slug: "gaming-laptop-pro",
    name: "Gaming Laptop Pro",
    description:
      "A high-performance gaming laptop powered by the latest Intel processor, RTX graphics, 16GB RAM, and ultra-fast SSD storage.",
    features: [
      "Intel Core i7 Processor",
      "NVIDIA RTX Graphics",
      "16GB RAM",
      "1TB SSD Storage",
      "RGB Backlit Keyboard",
    ],
    price: 189999,
    rating: 4.8,
    reviews: 156,
    image: "/products/gaming-laptop.jpg",
    category: "Laptops",
  },
  {
    id: 2,
    slug: "ultra-hd-monitor",
    name: 'Ultra HD Monitor 27"',
    description:
      "A stunning 27-inch Ultra HD monitor offering crystal-clear visuals for designers, developers, and gamers.",
    features: [
      "27-inch 4K Display",
      "144Hz Refresh Rate",
      "HDR Support",
      "Slim Bezel Design",
      "HDMI & DisplayPort",
    ],
    price: 64999,
    rating: 4.6,
    reviews: 89,
    image: "/products/ultra-hd-monitor.jpg",
    category: "Monitors",
  },
  {
    id: 3,
    slug: "wireless-headphones",
    name: "Wireless Noise-Canceling Headphones",
    description:
      "Premium wireless headphones with active noise cancellation and superior sound quality.",
    features: [
      "Active Noise Cancellation",
      "Bluetooth 5.3",
      "30-Hour Battery Life",
      "Fast Charging",
      "Comfort Fit Design",
    ],
    price: 29999,
    rating: 4.9,
    reviews: 234,
    image: "/products/wireless-headphones.jpg",
    category: "Audio",
  },
];
