import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen flex-col">
      <div className="border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            <div className="text-sm font-medium">Preview Mode</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-10 flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    </div>
  );
}