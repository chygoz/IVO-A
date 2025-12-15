import React, { Suspense } from "react";
import CustomersTable from "./table";
import TableLoading from "@/components/ui/table-loading";
import { getUsers } from "@/actions/user";

async function UsersTableMain() {
  const users = await getUsers();
  return (
    <Suspense fallback={<TableLoading />}>
      <CustomersTable users={users?.data?.results || []} />
    </Suspense>
  );
}

export default UsersTableMain;
