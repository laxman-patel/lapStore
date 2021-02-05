import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ images, brand, name, price, slug }) => {
  const [firstImage] = images;
  const { width, height, url } = firstImage;

  return (
    <>
      <Link href={`/store/${slug}`}>
        <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer hover:bg-gray-50   transition-colors rounded">
          <Image
            src={url}
            height={height}
            width={width}
            className="block relative rounded overflow-hidden"
          />
          <div className="mt-4">
            <h3 className="text-gray-500 text-xs tracking-widest title-font uppercase mb-1">
              {brand}
            </h3>
            <h2 className="text-gray-900 title-font capitalize text-lg font-medium">
              {name}
            </h2>
            <p className="mt-1">${price}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
