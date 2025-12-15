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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginationComponent } from "@/components/ui/paginationComponent";
import { cn, getInitials } from "@/lib/utils";
import EmptyTable from "@/components/ui/empty-table";
import { Card } from "@/components/ui/card";
import dayjs from "dayjs";
import { IUser } from "@/actions/user/util";
import Status from "@/components/ui/status";

type UsersTableProps = {
  users: IUser[];
};

function UsersTable({ users }: UsersTableProps) {
  const [dateRange, setDateRange] = React.useState("last90");
  return (
    <Card className="p-5">
      <div className="flex items-center mb-6">
        <h3 className="font-bold text-text text-[28px] ">All Users</h3>
        <div className="ml-auto flex flex-col sm:flex-row items-center gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger
              className="w-[160px] rounded-lg sm:ml-auto"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="last90" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="last30" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="last7" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {users.length ? (
        <>
          {" "}
          <Table>
            <TableHeader>
              <TableRow className="pb-[48px]">
                <TableHead className="w-[200px] sm:w-[400px]">
                  Customer Details
                </TableHead>
                <TableHead>Created On</TableHead>
                <TableHead>Email Verified</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow
                  className={cn(index === 0 && "border-t-0")}
                  key={index.toString()}
                >
                  <TableCell className="">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt="" />
                        <AvatarFallback>
                          {getInitials(`${user.firstName} ${user.lastName}`)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <h4 className="text-[#2D343F] capitalize font-medium">
                          {user.firstName} {user.lastName}
                        </h4>
                        <p className="text-[#898F9B]">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="">
                    {/**@ts-expect-error fixed */}
                    <p>{dayjs(user?.createdAt).format("DD/MM/YYYY")}</p>
                  </TableCell>
                  <TableCell className="">
                    <Status
                      variant={user.emailVerified ? "success" : "destructive"}
                      text={user.emailVerified ? "verified" : "unverified"}
                    />
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
        <EmptyTable
          title="No Users Yet"
          subTitle="It looks like you haven't added any customers. Once you do, they’ll appear here."
        />
      )}
    </Card>
  );
}

export default UsersTable;
