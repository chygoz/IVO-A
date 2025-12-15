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
import { IVOPagination } from "@/components/ui/ivo-pagination";
import { Metadata } from "@/types";
import PriceDisplay from "@/components/ui/price.display";
import { useRouter } from "next/navigation";
import { IOrder } from "@/data/orders";
import dayjs from "dayjs";
import { MoreHorizontal } from "lucide-react";
import Status from "@/components/ui/status";

type OrderTableProps = {
  orders: IOrder[];
  metadata: Metadata;
};

function OrderTable({ orders, metadata }: OrderTableProps) {
  const router = useRouter();

  return (
    <div className="text-black mt-4">
      {orders.length ? (
        <>
<div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className=""> Order ID</TableHead>
                <TableHead className="">Product</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="">Customer Details</TableHead>
                <TableHead className="">Store</TableHead>
                <TableHead className="">Total</TableHead>
                <TableHead className="">Status</TableHead>
                <TableHead className="">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index: number) => (
                <TableRow
                  onClick={() => {
                    router.push(`/dashboard/orders/${order.orderId}`);
                  }}
                  className="cursor-pointer"
                  key={`products-${index + 1}`}
                >
                  <TableCell className="">{order.orderId}</TableCell>
                  <TableCell className="capitalize">
                    {/* <div className="flex items-center gap-4">
                      <Image
                        className="w-[30px] h-[30px] rounded-md object-cover"
                        src={product?.variants[0]?.gallery[0]?.url || ""}
                        width={800}
                        height={800}
                        alt="img"
                      />
                      <span>{product.name}</span>
                    </div> */}
                    +2 products
                  </TableCell>
                  <TableCell className="capitalize">
                    {dayjs(order.createdAt).format("MMM DD, YYYY")}
                  </TableCell>
                  <TableCell className="">
                    <div>
                      <div className="capitalize">
                        {order.customer.firstName} {order.customer.lastName}
                      </div>
                      <div className="text-[#667085] text-xs">
                        {order.customer.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">
                    <div className="flex  flex-col items-center gap-2">
                      <div>{order.business.name}</div>
                      <Status
                        className="px-4 w-fit"
                        textClassName="text-[10px]"
                        variant={
                          order.business.type === "owner"
                            ? "warning"
                            : "destructive"
                        }
                        text={order.business.type}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="">
                    <PriceDisplay
                      currency={order.total.currency}
                      value={order.total.value.toString()}
                    />
                  </TableCell>
                  <TableCell className="">
                    <Status
                      variant={
                        order.status === "delivered" ? "success" : "warning"
                      }
                      text={order.status}
                    />
                  </TableCell>
                  <TableCell className="">
                    <MoreHorizontal />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
          <div className="flex justify-end w-full py-4">
            <IVOPagination
              currentPage={metadata.page}
              limit={metadata.limit}
              totalPages={metadata.totalPages}
              url={"/dashboard/orders"}
            />
          </div>
        </>
      ) : (
        <EmptyTable title={"No orders to review"}></EmptyTable>
      )}
    </div>
  );
}

export default OrderTable;
