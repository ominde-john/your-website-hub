import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { products } from "@/data/products";

const MarketplacePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Marketplace"
        description="Explore premium tech products curated by Teksoft Community"
      />

      <section className="py-16">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/marketplace/product/${product.id}`}
            >
              <Card className="hover:shadow-lg transition">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover rounded-t"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-techblue font-bold mt-2">
                    Ksh {product.price.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MarketplacePage;
