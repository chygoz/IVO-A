import React from "react";
import PageWrapper from "../ui/pageWrapper";
import { Card } from "../ui/card";
import { getOrders } from "@/data/orders";
import OrderList from "./list";

function OrdersComponent() {
  const orders = getOrders();
  return (
    <PageWrapper>
      <Card className="p-5 bg-white shadow-none border-none">
        <div className="flex items-center">
          <h4 className="text-xl font-semibold">Orders Management</h4>
        </div>
        <OrderList
          orders={orders}
          metadata={{
            limit: 10,
            page: 1,
            totalCount: 1,
            totalPages: 1,
          }}
        />
      </Card>
    </PageWrapper>
  );
}

export default OrdersComponent;
