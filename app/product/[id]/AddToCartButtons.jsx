"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../../context/AppContext";

export default function AddToCartButtons({ productId }) {
  const { addToCart } = useAppContext();
  const router = useRouter();

  return (
    <div className="flex items-center mt-10 gap-4">
      <button
        onClick={() => addToCart(productId)}
        className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
      >
        Add to Cart
      </button>
      <button
        onClick={() => {
          addToCart(productId);
          router.push("/cart");
        }}
        className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition"
      >
        Buy now
      </button>
    </div>
  );
}
