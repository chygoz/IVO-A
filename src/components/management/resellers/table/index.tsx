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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/actions/users/types";
import { calculateAge, getInitials } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

type ResellersTableProps = {
  resellers: User[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
};

const ResellersTable = ({ resellers, metadata }: ResellersTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("query");

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("p", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full">
      {resellers.length ? (
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F7F7F7]">
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Reseller Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Cohort</TableHead>
              <TableHead>Total Sales</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>AVG. Order</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Onboarded Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resellers.map((reseller) => (
              <TableRow key={reseller._id}>
                <TableCell>
                  <Checkbox />
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {getInitials(
                          `${reseller.firstName} ${reseller.lastName}`
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium capitalize">
                        {reseller.firstName} {reseller.lastName}
                      </p>
                      <p className="text-sm text-[#667085]">{reseller.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{reseller.phone}</TableCell>
                <TableCell className="capitalize">{reseller.gender}</TableCell>
                <TableCell>
                  {reseller?.business?.cohort ? reseller.business.cohort : "--"}
                </TableCell>
                <TableCell>0</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    0
                  </div>
                </TableCell>
                <TableCell>0</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 capitalize rounded-full text-sm ${reseller.mode === "onboard"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                      }`}
                  >
                    {reseller.mode}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 capitalize rounded-full text-sm ${reseller.mode === "onboard"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                      }`}
                  >
                    {new Date(reseller.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 capitalize rounded-full text-sm ${reseller.status === "active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                      }`}
                  >
                    {reseller.status}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 16 16"
                        >
                          <circle cx="8" cy="2" r="2" fill="currentColor" />
                          <circle cx="8" cy="8" r="2" fill="currentColor" />
                          <circle cx="8" cy="14" r="2" fill="currentColor" />
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Info</DropdownMenuItem>
                      <DropdownMenuItem>Set Discount</DropdownMenuItem>
                      <DropdownMenuItem>Offboarding</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center my-8">
          <h1 className="text-2xl font-semibold">No Resellers</h1>
          {!search ? (
            <p>No resellers on the platform yet</p>
          ) : (
            <p>No match found for &ldquo;{search}&ldquo;</p>
          )}
        </div>
      )}
      {metadata.pages > 1 ? (
        <div className="flex items-center justify-between py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(metadata.page - 1)}
            disabled={metadata.page <= 1}
          >
            Previous
          </Button>
          <div className="text-sm text-gray-500">
            Page {metadata.page} of {metadata.pages}
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={() => handlePageChange(metadata.page + 1)}
            disabled={metadata.page >= metadata.pages}
          >
            Next Page
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default ResellersTable;
