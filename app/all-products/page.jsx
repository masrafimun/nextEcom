import ProductList from "./ProductList";

export const metadata = {
  title: "All Products - My Store",
  description: "Browse all available products in our store.",
};

export default async function AllProductsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/product`, {
    cache: "no-store",
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message || "Failed to load products");
  }

  const products = data.products;

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}
