import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={product.name}
        description={product.category}
      />

      <section className="container-custom py-16">
        <Card className="p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {product.name}
          </h2>

          <p className="text-gray-700 mb-6">
            {product.description}
          </p>

          <h3 className="font-semibold text-lg mb-3">Key Features</h3>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <div className="mb-6">
            <span className="text-3xl font-bold text-techblue">
              Ksh {product.priceKsh.toLocaleString()}
            </span>
            {product.originalPriceKsh && (
              <span className="ml-3 text-gray-400 line-through">
                Ksh {product.originalPriceKsh.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex gap-4">
            <Button className="bg-techblue text-white">
              Add to Cart
            </Button>
            <Link to="/marketplace">
              <Button variant="outline">Back to Marketplace</Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default ProductDetailsPage;
