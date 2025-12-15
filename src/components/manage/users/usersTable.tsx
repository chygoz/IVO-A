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
import { UserAction } from "./action";
import TableLoading from "@/components/ui/table-loading";
import { useQuery } from "@tanstack/react-query";
import { getMyMembers } from "@/actions/business";
import dayjs from "dayjs";
import { Session } from "next-auth";

type UsersTableProps = {
  session: Session;
};

function UsersTable({ session }: UsersTableProps) {
  const { data, isPending } = useQuery({
    queryKey: [`my-users`],
    queryFn: getMyMembers,
  });

  if (isPending) return <TableLoading />;

  const users = data?.data?.results || [];
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">#</TableHead>
            <TableHead className="">Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.user._id}>
              <TableCell className="">{index + 1}</TableCell>
              <TableCell>
                <p className="font-medium capitalize">
                  {user.user.firstName} {user.user.lastName}
                </p>
                <small>{user.user.email}</small>
              </TableCell>
              <TableCell className="capitalize">{user.role}</TableCell>

              <TableCell className="">
                {dayjs(user.dateJoined).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell className="">
                {user.role !== "owner" && (
                  <UserAction user={user} current_partner={""} />
                )}
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

export default UsersTable;
