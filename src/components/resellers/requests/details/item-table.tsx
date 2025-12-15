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
import { PaginationComponent } from "@/components/ui/paginationComponent";
import { Badge } from "@/components/ui/badge";
import EmptyTable from "@/components/ui/empty-table";

import Image from "next/image";
import { IVOPagination } from "@/components/ui/ivo-pagination";
import { Metadata } from "@/types";
import { PRODUCT_ROUTE } from "@/constants";
import PriceDisplay from "@/components/ui/price.display";
import { Product } from "@/actions/submissions/utils";
import { Card } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";

type ProductTableProps = {
  items: Product[];
  metadata: Metadata;
};

function ItemTable({ items, metadata }: ProductTableProps) {
  const { requestId } = useParams();
  const router = useRouter();
  return (
    <Card className="min-h-64 p-4 lg:p-6">
      <div className="flex items-center">
        <h4 className="text-xl font-semibold">Items</h4>
      </div>
      <div className="text-black mt-4">
        {items.length ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="">Variants</TableHead>
                  <TableHead className="">Price</TableHead>
                  <TableHead className="">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((product, index: number) => (
                  <TableRow
                    onClick={() => {
                      router.push(`/dashboard/resellers/requests/${requestId}/preview`);
                    }}
                    className="cursor-pointer"
                    key={`products-${index + 1}`}
                  >
                    <TableCell className="capitalize">
                      <div className="flex items-center gap-4 truncate">
                        <Image
                          className="w-[30px] h-[30px] rounded-md object-cover"
                          src={product?.variants[0]?.gallery[0]?.url || ""}
                          width={800}
                          height={800}
                          alt="img"
                        />
                        <span className="truncate">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">
                      {product.category?.name}
                    </TableCell>
                    <TableCell className="capitalize">
                      {product.variants.length}
                    </TableCell>
                    <TableCell className="">
                      <PriceDisplay
                        currency={product.basePrice?.currency}
                        value={product.basePrice?.value}
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
                url={PRODUCT_ROUTE}
              />
            </div>
          </>
        ) : (
          <EmptyTable title="No Products yet."></EmptyTable>
        )}
      </div>
    </Card>
  );
}

export default ItemTable;
