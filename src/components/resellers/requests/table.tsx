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

import { Badge } from "@/components/ui/badge";
import EmptyTable from "@/components/ui/empty-table";
import { IVOPagination } from "@/components/ui/ivo-pagination";
import { Metadata } from "@/types";
import { PRODUCT_ROUTE } from "@/constants";
import { useRouter } from "next/navigation";
import { Submission } from "@/actions/submissions/utils";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

type ResellerTableProps = {
  requests: Submission[];
  metadata: Metadata;
};

function RequestsTable({ requests, metadata }: ResellerTableProps) {
  const router = useRouter();
  return (
    <div className="text-black mt-4">
      {requests.length ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Request ID</TableHead>
                <TableHead className="">Reseller Name</TableHead>
                <TableHead>Store Name</TableHead>
                <TableHead className="">Request Date</TableHead>
                <TableHead className="">Status</TableHead>
                <TableHead className="">Item Requested</TableHead>
                <TableHead className="">Last Modified</TableHead>
                <TableHead className="">Last Comments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request, index: number) => (
                <TableRow
                  onClick={() => {
                    router.push(`/dashboard/resellers/requests/${request._id}`);
                  }}
                  className="cursor-pointer"
                  key={`request-${index + 1}`}
                >
                  <TableCell className="text-[#0052CC] capitalize">
                    RQ-{request._id.substring(0, 7)}
                  </TableCell>
                  <TableCell className="capitalize">
                    {request.initiated.user.firstName}{" "}
                    {request.initiated.user.lastName}
                  </TableCell>
                  <TableCell className="capitalize">
                    {request.business.name}
                  </TableCell>
                  <TableCell className="capitalize">
                    {dayjs(request.initiated.initiatedAt).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "capitalize flex items-center gap-1",
                      request.status === "approved"
                        ? "text-[#11A75C]"
                        : request.status === "rejected"
                        ? "text-red-500"
                        : "text-[#FFC403]"
                    )}
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="8" height="8" rx="4" fill="currentColor" />
                    </svg>
                    {request.status}
                  </TableCell>
                  <TableCell className="capitalize items-center text-center">
                    {request.items.length}
                  </TableCell>
                  <TableCell className=""></TableCell>
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
        <EmptyTable title="No Requests yet."></EmptyTable>
      )}
    </div>
  );
}

export default RequestsTable;
