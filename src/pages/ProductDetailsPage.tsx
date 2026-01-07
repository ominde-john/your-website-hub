import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { products } from "@/data/products";

const ProductDetailsPage = () => {
  const { productId } = useParams();

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
      </div>
    );
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const whatsappNumber = "2547XXXXXXXX"; // replace
  const message = encodeURIComponent(
    `Hello Teksoft Community,\n\nI want to order:\n${product.name}\nPrice: Ksh ${product.price.toLocaleString()}`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <>
      <Helmet>
        <title>{product.name} | Teksoft Marketplace</title>
      </Helmet>

      <div className="container py-16">
        <div className="grid md:grid-cols-2 gap-10">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg"
          />

          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <p className="text-2xl font-bold text-techblue mb-6">
              Ksh {product.price.toLocaleString()}
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold">
                📲 Order Now via WhatsApp
              </button>
            </a>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h3 className="text-2xl font-bold mb-6">Related Products</h3>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  to={`/marketplace/product/${item.id}`}
                  className="border rounded-lg p-4 hover:shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-full object-cover rounded"
                  />
                  <h4 className="mt-3 font-semibold">{item.name}</h4>
                  <p className="text-techblue font-bold">
                    Ksh {item.price.toLocaleString()}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default ProductDetailsPage;
