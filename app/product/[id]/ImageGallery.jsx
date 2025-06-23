"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ images, productName }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
      <>
      <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
        <Image
          src={mainImage}
          alt={productName}
          width={1280}
          height={720}
          className="w-full h-auto object-cover mix-blend-multiply"
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setMainImage(img)}
            className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"

          >
            <Image
              src={img}
              alt={`${productName} image ${i + 1}`}
              width={1280}
              height={720}
              className="w-full h-auto object-cover mix-blend-multiply"
            />
          </div>
        ))}
      </div>
  </>
  );
}

