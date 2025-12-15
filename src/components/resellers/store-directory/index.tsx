"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StoreFront } from "@/actions/resellers/types";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type StoreDirectoryProps = {
  resellers: StoreFront[];
  metadata: {
    total: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

const StoreDirectory = ({ resellers, metadata }: StoreDirectoryProps) => {
  //   const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("p", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Store Directory</CardTitle>
        {/* <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search store..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div> */}
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Storefront Name</th>
                <th className="text-left p-4">List of Store Link</th>
                <th className="text-left p-4">Created Date</th>
                <th className="text-left p-4">Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {resellers.map((store, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4 capitalize">{store.name}</td>
                  <td className="p-4">
                    <a
                      href={`https://${store?.storefront?.domain?.subdomain}.resellerivo.com`}
                      className="text-blue-600 hover:underline"
                    >
                      {store.storefront?.domain.subdomain}.resellerivo.com
                    </a>
                  </td>
                  <td className="p-4">
                    {dayjs(store.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="p-4">{0}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {metadata.totalPages > 1 ? (
            <div className="flex items-center justify-between py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(metadata.currentPage - 1)}
                disabled={metadata.currentPage <= 1}
              >
                Previous
              </Button>
              <div className="text-sm text-gray-500">
                Page {metadata.currentPage} of {metadata.totalPages}
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={() => handlePageChange(metadata.currentPage + 1)}
                disabled={metadata.currentPage >= metadata.totalPages}
              >
                Next Page
              </Button>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default StoreDirectory;
