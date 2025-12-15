import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "./skeleton";

function TableLoading() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">
            <Skeleton className="h-5 w-full" />
          </TableHead>
          <TableHead className="">
            <Skeleton className="h-5 w-full" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-5 w-full" />
          </TableHead>
          <TableHead className="">
            <Skeleton className="h-5 w-full" />
          </TableHead>
          <TableHead className="">
            <Skeleton className="h-5 w-full" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4, 5].map((booking) => (
          <TableRow key={booking}>
            <TableCell className="font-medium">
              <Skeleton className="h-5 w-full" />
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-5 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-full" />
            </TableCell>
            <TableCell className="">
              <Skeleton className="h-5 w-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TableLoading;
