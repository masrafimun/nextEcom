import Image from "next/image";
import { assets } from "../../../assets/assets";
import ProductCard from "../../../components/ProductCard";
import AddToCartButtons from "./AddToCartButtons";
import ImageGallery from "./ImageGallery";

export async function generateMetadata({ params }) {
  const product = await fetchProduct(params.id);
  if (!product) {
    return {
      title: "Product Not Found",
      description: "This product does not exist.",
    };
  }
  return {
    title: product.name,
    description: product.description.slice(0, 160),
  };
}

async function fetchProduct(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/product/${id}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.product || null;
}

async function fetchFeaturedProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/product`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.products || [];
}

export default async function ProductPage({ params }) {
  const product = await fetchProduct(params.id);
  const products = await fetchFeaturedProducts();

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="px-5 lg:px-16 xl:px-20">
          <ImageGallery images={product.image} productName={product.name} />
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
            {product.name}
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <Image
                className="h-4 w-4"
                src={assets.star_icon}
                alt="star_icon"
              />
              <Image
                className="h-4 w-4"
                src={assets.star_icon}
                alt="star_icon"
              />
              <Image
                className="h-4 w-4"
                src={assets.star_icon}
                alt="star_icon"
              />
              <Image
                className="h-4 w-4"
                src={assets.star_icon}
                alt="star_icon"
              />
              <Image
                className="h-4 w-4"
                src={assets.star_dull_icon}
                alt="star_dull_icon"
              />
            </div>
            <p>(4.5)</p>
          </div>

          <p className="text-gray-600 mt-3">{product.description}</p>
          <p className="text-3xl font-medium mt-6">
            {product.offerPrice}
            <span className="ml-2 line-through text-gray-400">
              ${product.price}
            </span>
          </p>

          <hr className="bg-gray-600 my-6" />

          <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full max-w-72">
              <tbody>
                <tr>
                  <td className="text-gray-600 font-medium">Brand</td>
                  <td className="text-gray-800/50">Generic</td>
                </tr>
                <tr>
                  <td className="text-gray-600 font-medium">Color</td>
                  <td className="text-gray-800/50">Multi</td>
                </tr>
                <tr>
                  <td className="text-gray-600 font-medium">Category</td>
                  <td className="text-gray-800/50">{product.category}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <AddToCartButtons productId={product._id} />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mb-4 mt-16">
          <p className="text-3xl font-medium">
            Featured{" "}
            <span className="font-medium text-orange-600">Products</span>
          </p>
          <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
          {products.slice(0, 5).map((item, index) => (
            <ProductCard key={index} product={item} />
          ))}
        </div>

        <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
          See more
        </button>
      </div>
    </div>
  );
}
