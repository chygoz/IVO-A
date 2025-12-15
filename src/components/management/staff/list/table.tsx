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
import EmptyTable from "@/components/ui/empty-table";
import { IVOPagination } from "@/components/ui/ivo-pagination";
import { Metadata } from "@/types";
import { useRouter } from "next/navigation";
import { Member } from "@/actions/business";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import dayjs from "dayjs";
import Status from "@/components/ui/status";
import { UserAction } from "@/components/manage/users/action";

type ProductTableProps = {
  members: Member[];
  metadata: Metadata;
};

function StaffTable({ members, metadata }: ProductTableProps) {
  const router = useRouter();

  return (
    <div className="text-black mt-4">
      {members.length ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Staff Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="">Role</TableHead>
                <TableHead className="">Status</TableHead>
                <TableHead className="">Date Joined</TableHead>
                <TableHead className="">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member, index: number) => (
                <TableRow
                  onClick={() => {

                  }}
                  className="cursor-pointer"
                  key={`products-${index + 1}`}
                >
                  <TableCell className="capitalize">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="" alt="" />
                        <AvatarFallback>
                          {getInitials(
                            `${member?.user?.firstName} ${member?.user?.lastName}`
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <span>
                        {member?.user?.firstName} {member?.user?.lastName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">
                    {member?.phone || "N?A"}
                  </TableCell>
                  <TableCell className="capitalize">{member.role}</TableCell>
                  <TableCell className="capitalize">
                    <Status text="active" variant={"success"} />
                  </TableCell>
                  <TableCell className="capitalize">
                    {dayjs(member.dateJoined).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell className="">
                    <UserAction user={member} current_partner={""} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end w-full py-4">
            <IVOPagination
              currentPage={metadata.page}
              limit={metadata.limit}
              totalPages={metadata.totalPages}
              url={"/dashboard/management/staff"}
            />
          </div>
        </>
      ) : (
        <EmptyTable title={"No Staff yet"}></EmptyTable>
      )}
    </div>
  );
}

export default StaffTable;
