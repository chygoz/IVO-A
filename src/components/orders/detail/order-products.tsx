import { OrderDetailType } from "@/types/order";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils-alt";

interface OrderProductsProps {
  order: OrderDetailType;
}

export function OrderProducts({ order }: OrderProductsProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-neutral-800 text-lg">Products</h2>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-neutral-500 mr-1" />
            <span className="text-sm text-neutral-600">
              {order.orderDate
                ? formatDate(order.orderDate, "dd MMM yyyy, HH:mm")
                : "Not available"}
            </span>
            <span className="ml-2 px-2 py-1 text-xs text-blue-600 bg-blue-100 rounded-md">
              {order.orderProgress?.[order.orderProgress.length - 1].status}
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                QTY
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {order.items.map((item, index) => (
              <tr key={index} className="hover:bg-neutral-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-neutral-200 rounded-md">
                      {item.variant?.gallery?.[0]?.url ? (
                        <Image
                          src={item.variant.gallery[0]?.url}
                          width={800}
                          height={800}
                          alt={item.name}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-md bg-neutral-300 flex items-center justify-center text-xs text-neutral-600">
                          No img
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-neutral-900">
                        {item.name}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {item.variant?.color?.name && (
                          <span>
                            Color: {item.variant.color.name}
                            {item.variant.size?.name && " / "}
                          </span>
                        )}
                        {item.variant?.size?.name && (
                          <span>Size: {item.variant.size.name}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  {item.productId.slice(-6).toUpperCase()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  {item.quantity} pcs
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  {formatCurrency(
                    Number(item.price.value),
                    item.price.currency
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                  {formatCurrency(
                    Number(item.price.value) * item.quantity,
                    item.price.currency
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t border-neutral-200 bg-neutral-50">
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-neutral-600">Subtotal</span>
            <span className="text-sm font-medium text-neutral-900">
              {formatCurrency(
                Number(order.totalPrice.value) -
                Number(order.deliveryCost?.value || 0),
                order.totalPrice.currency
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-neutral-600">Shipping Cost</span>
            <span className="text-sm font-medium text-neutral-900">
              {formatCurrency(
                Number(order.deliveryCost?.value || 0),
                order.deliveryCost?.currency || order.totalPrice.currency
              )}
            </span>
          </div>

          {order.feeBreakdown?.gatewayFee && (
            <div className="flex justify-between">
              <span className="text-sm text-neutral-600">
                Payment Processing Fee
              </span>
              <span className="text-sm font-medium text-neutral-900">
                {formatCurrency(
                  order.feeBreakdown.gatewayFee.total,
                  order.totalPrice.currency
                )}
              </span>
            </div>
          )}

          <div className="flex justify-between pt-3 border-t border-neutral-200">
            <span className="text-base font-medium text-neutral-900">
              Grand Total
            </span>
            <span className="text-base font-bold text-[#20483f]">
              {formatCurrency(
                Number(order.totalPrice.value),
                order.totalPrice.currency
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
