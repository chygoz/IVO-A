import React from "react";
import { UserChart } from "./table";

function UserAnalytics() {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <div className="sm:col-span-3">
        <UserChart />
      </div>
    </div>
  );
}

export default UserAnalytics;
