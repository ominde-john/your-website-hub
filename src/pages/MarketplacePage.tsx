import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone, Headphones, Laptop, Code, Database, Shield, Cloud, ShoppingCart, Star } from "lucide-react";

const electronicProducts = [
  {
    id: 1,
    name: "Gaming Laptop Pro",
    category: "Laptops",
    price: 1299.99,
    originalPrice: 1499.99,
    rating: 4.8,
    reviews: 156,
    image: "/placeholder.svg",
    icon: <Laptop className="w-8 h-8" />,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Ultra HD Monitor 27\"",
    category: "Monitors",
    price: 449.99,
    originalPrice: 549.99,
    rating: 4.6,
    reviews: 89,
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
    icon: <Smartphone className="w-8 h-8" />,
    badge: "New",
  },
  {
    id: 5,
    name: "Mechanical Gaming Keyboard",
    category: "Accessories",
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.5,
    reviews: 67,
    image: "/placeholder.svg",
    icon: <Monitor className="w-8 h-8" />,
  },
  {
    id: 6,
    name: "Wireless Gaming Mouse",
    category: "Accessories",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.4,
    reviews: 145,
    image: "/placeholder.svg",
    icon: <Monitor className="w-8 h-8" />,
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
    icon: <Cloud className="w-8 h-8" />,
    badge: "Popular",
    license: "Monthly",
  },
  {
    id: 9,
    name: "Developer IDE Pro",
    category: "Development",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviews: 312,
    image: "/placeholder.svg",
    icon: <Code className="w-8 h-8" />,
    badge: "Best Seller",
    license: "Lifetime",
  },
  {
    id: 10,
    name: "Database Management Tool",
    category: "Database",
    price: 99.99,
    originalPrice: 129.99,
    rating: 4.6,
    reviews: 78,
    image: "/placeholder.svg",
    icon: <Database className="w-8 h-8" />,
    license: "1 Year",
  },
  {
    id: 11,
    name: "AI Code Assistant",
    category: "Development",
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.9,
    reviews: 523,
    image: "/placeholder.svg",
    icon: <Code className="w-8 h-8" />,
    badge: "New",
    license: "Monthly",
  },
  {
    id: 12,
    name: "Network Monitoring Suite",
    category: "Security",
    price: 179.99,
    originalPrice: 229.99,
    rating: 4.5,
    reviews: 45,
    image: "/placeholder.svg",
    icon: <Shield className="w-8 h-8" />,
    license: "1 Year",
  },
];

const ProductCard = ({ product, type }: { product: typeof electronicProducts[0] & { license?: string }; type: "electronics" | "software" }) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-gray-200 hover:border-techgold">
      <CardHeader className="p-0 relative">
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center group-hover:from-techblue/10 group-hover:to-techgold/10 transition-colors">
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
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm ml-1 text-gray-700">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-400">({product.reviews} reviews)</span>
        </div>
        {type === "software" && product.license && (
          <Badge variant="outline" className="text-xs mb-2">
            {product.license}
          </Badge>
        )}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-techblue">${product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-techblue hover:bg-techblue-dark text-white gap-2">
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList className="bg-white shadow-md p-1">
                <TabsTrigger 
                  value="electronics" 
                  className="px-8 py-3 data-[state=active]:bg-techblue data-[state=active]:text-white"
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  Electronics
                </TabsTrigger>
                <TabsTrigger 
                  value="software"
                  className="px-8 py-3 data-[state=active]:bg-techblue data-[state=active]:text-white"
                >
                  <Code className="w-4 h-4 mr-2" />
                  Software
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="electronics" className="mt-0">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Electronic Products</h2>
                <p className="text-gray-600">High-quality gadgets and devices for tech enthusiasts</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {electronicProducts.map((product) => (
                  <ProductCard key={product.id} product={product} type="electronics" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="software" className="mt-0">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Software Products</h2>
                <p className="text-gray-600">Professional tools and applications for developers and businesses</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {softwareProducts.map((product) => (
                  <ProductCard key={product.id} product={product} type="software" />
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
