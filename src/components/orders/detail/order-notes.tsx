import { OrderDetailType } from "@/types/order";
import { formatDate } from "@/lib/utils-alt";
import { MessageSquare } from "lucide-react";

interface OrderNotesProps {
  order: OrderDetailType;
}

export function OrderNotes({ order }: OrderNotesProps) {
  if (!order.notes || order.notes.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="font-semibold text-neutral-800 text-lg mb-4 flex items-center">
        <MessageSquare className="h-5 w-5 mr-2 text-neutral-600" />
        Order Notes
      </h2>

      <div className="space-y-4">
        {order.notes.map((note, index) => (
          <div
            key={index}
            className="p-3 bg-neutral-50 rounded-md border border-neutral-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <span className="text-xs font-medium text-neutral-700">
                  {note.createdBy.name}
                </span>
              </div>
              <span className="text-xs text-neutral-500">
                {formatDate(note.createdAt, "PPP p")}
              </span>
            </div>
            <p className="text-sm text-neutral-800 mt-2">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
