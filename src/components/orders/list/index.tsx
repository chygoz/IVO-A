import React from "react";
import OrderTable from "./table.component";
import { Metadata } from "@/types";
import { IOrder } from "@/data/orders";

type OrderListProps = {
  orders: IOrder[];
  metadata: Metadata;
};

function OrderList({ orders, metadata }: OrderListProps) {
  return <OrderTable orders={orders} metadata={metadata} />;
}

export default OrderList;
