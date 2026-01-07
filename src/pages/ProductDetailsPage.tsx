import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, MessageCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const products = [
  {
    id: "gaming-laptop-pro",
    name: "Gaming Laptop Pro",
    description:
      "A high-performance gaming laptop powered by the latest Intel processor, RTX graphics, 16GB RAM, and ultra-fast SSD storage. Perfect for gaming, AI workloads, and professional development.",
    price: 189999,
    category: "Laptops",
    rating: 4.8,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  },
];

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Product not found
      </div>
    );
  }

  const whatsappLink = `https://wa.me/254115000514?text=Hello%20Teksoft%20Community,%20I%20want%20to%20order%20${encodeURIComponent(
    product.name
  )}`;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO SECTION */}
      <div
        className="relative h-[85vh] flex items-center"
        style={{
          backgroundImage: `url(${product.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />

        {/* CONTENT */}
        <div className="relative z-10 container-custom max-w-4xl">
          <Badge className="mb-4 bg-techgold text-black">
            {product.category}
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-gray-200 text-lg leading-relaxed mb-6">
            {product.description}
          </p>

          {/* RATING */}
          <div className="flex items-center gap-3 mb-6">
            <Star className="text-yellow-400 fill-yellow-400 w-5 h-5" />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-gray-400">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* PRICE */}
          <div className="text-3xl font-bold text-techblue mb-8">
            Ksh {product.price.toLocaleString()}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-techblue hover:bg-techblue-dark text-white gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>

            <a href={whatsappLink} target="_blank" rel="noreferrer">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Order Now via WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* DETAILS SECTION */}
      <section className="py-16 bg-gray-950">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-bold mb-4 text-techgold">
            Product Overview
          </h2>

          <p className="text-gray-300 leading-relaxed">
            This product is carefully selected by Teksoft Community to meet
            professional, gaming, and AI computing needs. Built with
            performance, durability, and future scalability in mind.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsPage;
