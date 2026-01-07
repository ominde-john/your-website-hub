import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";

const MarketplacePage = () => {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white">
      <PageHeader
        title="Marketplace"
        description="Browse premium tech products curated by Teksoft Community"
      />

      <section className="py-16">
        <div className="container-custom grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-[#111827] border border-gray-800 hover:border-techblue transition"
            >
              {/* IMAGE */}
              <div className="h-56 bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold mb-2">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-gray-300">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <p className="text-techblue text-xl font-bold">
                  Ksh {product.price.toLocaleString()}
                </p>
              </CardContent>

              {/* ACTION */}
              <CardFooter className="p-5 pt-0">
                <Link
                  to={`/marketplace/product/${product.slug}`}
                  className="w-full"
                >
                  <Button className="w-full bg-techblue hover:bg-techblue-dark text-white gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    View Product
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MarketplacePage;
