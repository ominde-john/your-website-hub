export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "gaming-laptop-pro",
    name: "Gaming Laptop Pro",
    category: "Laptops",
    price: 189999,
    image: "/products/laptop.jpg",
    description:
      "A high-performance gaming laptop powered by the latest Intel processor, RTX graphics, 16GB RAM, and ultra-fast SSD storage. Perfect for gaming, AI workloads, and professional development.",
  },
  {
    id: "ultra-hd-monitor",
    name: 'Ultra HD Monitor 27"',
    category: "Monitors",
    price: 65999,
    image: "/products/monitor.jpg",
    description:
      "A stunning 27-inch 4K Ultra HD monitor with HDR support, ultra-thin bezels, and crystal-clear color accuracy for designers, developers, and gamers.",
  },
  {
    id: "wireless-headphones",
    name: "Wireless Noise-Canceling Headphones",
    category: "Audio",
    price: 24999,
    image: "/products/headphones.jpg",
    description:
      "Premium wireless headphones with active noise cancellation, deep bass, long battery life, and superior comfort for work and entertainment.",
  },
];
