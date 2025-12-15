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
import { PaginationComponent } from "@/components/ui/paginationComponent";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { Transaction } from "@/actions/transactions/utils";
import EmptyTable from "@/components/ui/empty-table";

type TransactionTableProps = {
  transactions: Transaction[];
};

function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="text-black mt-4">
      {transactions.length ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Reference</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="">Amount</TableHead>
                <TableHead className="">Status</TableHead>
                <TableHead className="">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index: number) => (
                <TableRow key={`transaction-${index + 1}`}>
                  <TableCell className="font-medium">
                    {transaction.referenceId}
                  </TableCell>
                  <TableCell>{transaction.user.email}</TableCell>
                  <TableCell className="">NGN{transaction.amount}</TableCell>
                  <TableCell className="">
                    {renderStatus(transaction.status)}
                  </TableCell>
                  <TableCell className="">
                    {dayjs(transaction.createdAt).format("YYYY/MM/DD")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end w-full py-4">
            <PaginationComponent />
          </div>
        </>
      ) : (
        <EmptyTable title="No Transactions yet."></EmptyTable>
      )}
    </div>
  );
}

export default TransactionTable;

function renderStatus(status: string) {
  return (
    <Badge
      className={`shadow-none border border-solid py-0.5 px-1 text-normal ${
        status === "success"
          ? "border-green-500 text-green-50s0 bg-green-100"
          : "border-red-500 text-red-50s0 bg-red-100"
      }`}
    >
      {status}
    </Badge>
  );
}
