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
import { InviteeAction } from "./action";
import dayjs from "dayjs";
import TableLoading from "@/components/ui/table-loading";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import { getMyInvites } from "@/actions/business";

type InvitesTableProps = {
  session: Session;
};

function InvitesTable({ session }: InvitesTableProps) {
  const { data, isPending } = useQuery({
    queryKey: [`my-invites`],
    queryFn: getMyInvites,
  });

  if (isPending) return <TableLoading />;

  const invites = data?.data?.results || [];
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">#</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Sent Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invites.map((invitee, index) => (
            <TableRow key={invitee.email}>
              <TableCell className="">{index + 1}</TableCell>
              <TableCell>{invitee.email}</TableCell>
              <TableCell className="">
                {dayjs(invitee.date).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell className="">
                <div className="bg-yellow-100 text-yellow-500 px-4 py-2 rounded-2xl font-medium w-fit">
                  Pending
                </div>
              </TableCell>
              <TableCell className="">
                <InviteeAction invitee={invitee} current_partner={""} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end w-full py-4">
        <PaginationComponent />
      </div>
    </div>
  );
}

export default InvitesTable;
