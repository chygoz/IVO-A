// components/ProductList.tsx
import React from "react";
import Image from "next/image";
import { Product } from "@/types";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="border rounded">
      <div className="flex justify-between p-4 border-b">
        <span className="font-semibold">Products</span>
        <span className="text-sm text-gray-600">
          {products.length} Products
        </span>
      </div>
      <div>
        {products.map((product, index) => (
          <div
            key={index}
            className="flex items-center p-4 border-b last:border-b-0"
          >
            <div className="mr-4">
              {/* <Image
                src={product.image}
                alt={product.name}
                width={50}
                height={50}
                className="object-cover"
              /> */}
            </div>
            <div className="flex-grow">
              <div className="font-medium">{product.name}</div>
              {/* <div className="text-sm text-gray-600">SKU: {product.sku}</div> */}
            </div>
            <div className="text-right">
              {/* <div>QTY: {product?.quantity}</div> */}
              <div className="font-semibold">
                {/* N {product?.total.toLocaleString()} */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
