import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";

const MarketplacePage = () => {
  const electronics = products.filter(p => p.type === "electronics");

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Marketplace"
        description="Discover premium electronics curated by Teksoft"
      />

      <section className="py-16">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {electronics.map(product => (
            <Link
              key={product.id}
              to={`/marketplace/product/${product.slug}`}
            >
              <Card className="hover:shadow-xl transition cursor-pointer">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-32 object-contain"
                  />
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{product.name}</h3>

                  <div className="flex items-center text-yellow-500 mt-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-sm text-gray-700">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="mt-2 text-techblue font-bold text-xl">
                    Ksh {product.price.toLocaleString()}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    View Product
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}

        </div>
      </section>
    </div>
  );
};

export default MarketplacePage;
