'use client';
import SearchBar from "../../components/SearchBar";
import ProductCard from "../../components/ProductCard";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";

export default function ProductList({ products }) {
  const { search, showSearch } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState(products);

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredProducts(productsCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [search, showSearch, products]);

  return (
    <>
      <SearchBar />
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
        <div className="flex flex-col items-end pt-12">
          <p className="text-2xl font-medium">All products</p>
          <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
