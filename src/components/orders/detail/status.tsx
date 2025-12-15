// components/OrderStatus.tsx
import React, { useState } from "react";

interface OrderStatusProps {
  currentStatus: string;
  orderId: string;
}

const OrderStatus: React.FC<OrderStatusProps> = ({
  currentStatus,
  orderId,
}) => {
  const [status, setStatus] = useState(currentStatus);

  return (
    <div className="border rounded p-4">
      <div className="flex justify-between items-center">
        <span className="font-semibold">Order Status</span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="Processing">Processing</option>
          <option value="Packed">Packed</option>
          <option value="Shipping">Shipping</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
      <div className="mt-2 text-sm text-gray-600">Order: {orderId}</div>
    </div>
  );
};

export default OrderStatus;
