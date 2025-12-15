"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProductPreviewWrapper from "./ProductPreviewWrapper";

export default function ProductPreviewPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="flex h-screen flex-col">
      <div className="border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              asChild
              className="h-8 w-8 rounded-full"
            >
              <Link href={`/dashboard/products/${params.slug}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="text-sm font-medium">Preview Mode</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <ProductPreviewWrapper slug={params.slug} />
      </div>
    </div>
  );
}