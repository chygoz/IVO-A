"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmptyTable from "@/components/ui/empty-table";
import { Product } from "@/actions/products/types";
import Image from "next/image";
import { IVOPagination } from "@/components/ui/ivo-pagination";
import { Metadata } from "@/types";
import PriceDisplay from "@/components/ui/price.display";
import { useRouter } from "next/navigation";
import { IBlank } from "@/actions/blanks/types";

type ProductTableProps = {
  products: Product[] | IBlank[];
  metadata: Metadata;
  type: "product" | "blank";
};

const actions = [
  {
    name: "Product",
    slug: "product",
    baseUrl: "/dashboard/products",
    empty: "No Products yet.",
  },
  {
    name: "Blank",
    slug: "blank",
    baseUrl: "/dashboard/resellers/blanks",
    empty: "No Blanks yet.",
  },
];

function ProductTable({ products, metadata, type }: ProductTableProps) {
  const router = useRouter();
  const action = actions.find((act) => act.slug === type) || actions[0];
  return (
    <div className="text-black mt-4">
      {products.length ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">{action.name} Code</TableHead>
                <TableHead className="">{action.name}</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="">Availability Mode</TableHead>
                <TableHead className="">Status</TableHead>
                <TableHead className="">Price</TableHead>
                <TableHead className="">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index: number) => (
                <TableRow
                  onClick={() => {
                    router.push(`${action.baseUrl}/${product._id}`);
                  }}
                  className="cursor-pointer"
                  key={`products-${index + 1}`}
                >
                  <TableCell className="">{product.code}</TableCell>
                  <TableCell className="capitalize">
                    <div className="flex items-center gap-4">
                      <Image
                        className="w-[30px] h-[30px] rounded-md object-cover"
                        src={product?.variants[0]?.gallery[0]?.url || ""}
                        width={800}
                        height={800}
                        alt="img"
                      />
                      <span>{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">
                    {product.category?.name}
                  </TableCell>
                  <TableCell className="capitalize">
                    {product.mode || "pre-order"}
                  </TableCell>
                  <TableCell className="capitalize">{product.status}</TableCell>
                  <TableCell className="">
                    <PriceDisplay
                      currency={product.basePrice.currency}
                      value={product.basePrice.value}
                    />
                  </TableCell>
                  <TableCell className=""></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end w-full py-4">
            <IVOPagination
              currentPage={metadata.page}
              limit={metadata.limit}
              totalPages={metadata.totalPages}
              url={action.baseUrl}
            />
          </div>
        </>
      ) : (
        <EmptyTable title={action.empty}></EmptyTable>
      )}
    </div>
  );
}

export default ProductTable;
