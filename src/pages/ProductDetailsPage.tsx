import { useParams } from "react-router-dom";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container-custom py-16 grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="bg-gray-900 rounded-xl p-10 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-80"
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-gray-400 mb-6">
            {product.description}
          </p>

          <ul className="list-disc pl-5 mb-6 text-gray-300 space-y-2">
            {product.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>

          <div className="text-2xl font-bold text-techblue mb-6">
            Ksh {product.price.toLocaleString()}
          </div>

          <div className="flex gap-4">
            <Button className="bg-green-600 hover:bg-green-700">
              Order via WhatsApp
            </Button>

            <Button className="bg-techblue hover:bg-techblue-dark">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailsPage;
