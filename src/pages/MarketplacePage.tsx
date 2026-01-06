import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Monitor,
  Smartphone,
  Headphones,
  Laptop,
  Code,
  Database,
  Shield,
  Cloud,
  ShoppingCart,
  Star,
} from "lucide-react";

/* =============================
   Currency helpers
============================= */
const USD_TO_KSH = 160; // 🔁 change anytime if rate updates

const formatKsh = (usd: number) =>
  `Ksh ${Math.round(usd * USD_TO_KSH).toLocaleString("en-KE")}`;

/* =============================
   Products
============================= */
const electronicProducts = [
  {
    id: 1,
    name: "Gaming Laptop Pro",
    category: "Laptops",
    price: 1299.99,
    originalPrice: 1499.99,
    rating: 4.8,
    reviews: 156,
    icon: <Laptop className="w-8 h-8" />,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: 'Ultra HD Monitor 27"',
    category: "Monitors",
    price: 449.99,
    originalPrice: 549.99,
    rating: 4.6,
    reviews: 89,
    icon: <Monitor className="w-8 h-8" />,
    badge: "Sale",
  },
  {
    id: 3,
    name: "Wireless Noise-Canceling Headphones",
    category: "Audio",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviews: 234,
    icon: <Headphones className="w-8 h-8" />,
    badge: "Top Rated",
  },
  {
    id: 4,
    name: "Smartphone X Pro",
    category: "Phones",
    price: 899.99,
    originalPrice: 999.99,
    rating: 4.7,
    reviews: 412,
    icon: <Smartphone className="w-8 h-8" />,
    badge: "New",
  },
];

const softwareProducts = [
  {
    id: 7,
    name: "Enterprise Security Suite",
    category: "Security",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.9,
    reviews: 89,
    icon: <Shield className="w-8 h-8" />,
    badge: "Enterprise",
    license: "1 Year",
  },
  {
    id: 8,
    name: "Cloud Management Platform",
    category: "Cloud",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviews: 156,
    icon: <Cloud className="w-8 h-8" />,
    badge: "Popular",
    license: "Monthly",
  },
];

/* =============================
   Product Card
============================= */
const ProductCard = ({
  product,
  type,
}: {
  product: any;
  type: "electronics" | "software";
}) => {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <Link to={`/marketplace/product/${product.id}`} className="group">
      <Card className="hover:shadow-xl transition-all border-gray-200 hover:border-techgold h-full">
        <CardHeader className="p-0 relative">
          <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-techblue/10 group-hover:to-techgold/10">
            <div className="text-techblue group-hover:scale-110 transition-transform">
              {product.icon}
            </div>
          </div>

          {product.badge && (
            <Badge className="absolute top-3 left-3 bg-techgold text-white">
              {product.badge}
            </Badge>
          )}

          {discount > 0 && (
            <Badge className="absolute top-3 right-3 bg-red-500 text-white">
              -{discount}%
            </Badge>
          )}
        </CardHeader>

        <CardContent className="p-4">
          <p className="text-xs text-gray-500 uppercase mb-1">
            {product.category}
          </p>
          <h3 className="font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm">{product.rating}</span>
            <span className="text-xs text-gray-400">
              ({product.reviews} reviews)
            </span>
          </div>

          {type === "software" && product.license && (
            <Badge variant="outline" className="text-xs mb-2">
              {product.license}
            </Badge>
          )}

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-techblue">
              {formatKsh(product.price)}
            </span>
            <span className="text-sm text-gray-400 line-through">
              {formatKsh(product.originalPrice)}
            </span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button className="w-full bg-techblue text-white gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

/* =============================
   Page
============================= */
const MarketplacePage = () => {
  const [activeTab, setActiveTab] = useState("electronics");

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Marketplace"
        description="Discover premium electronics and software products curated by Teksoft"
      />

      <section className="py-16">
        <div className="container-custom">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mx-auto mb-10 bg-white shadow-md">
              <TabsTrigger value="electronics">
                <Monitor className="w-4 h-4 mr-2" />
                Electronics
              </TabsTrigger>
              <TabsTrigger value="software">
                <Code className="w-4 h-4 mr-2" />
                Software
              </TabsTrigger>
            </TabsList>

            <TabsContent value="electronics">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {electronicProducts.map((p) => (
                  <ProductCard key={p.id} product={p} type="electronics" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="software">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {softwareProducts.map((p) => (
                  <ProductCard key={p.id} product={p} type="software" />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default MarketplacePage;
