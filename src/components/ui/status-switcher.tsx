"use client";
import { cn } from "@/lib/utils";
import React from "react";

const list = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Blocked", value: "blocked" },
];

function StatusSwitcher() {
  const [selected, setSelected] = React.useState("all");
  return (
    <div>
      <ul className="flex items-center border border-gray-300 rounded-md p-1">
        {list.map((item) => (
          <li key={item.value}>
            <button
              onClick={() => {
                setSelected(item.value);
              }}
              className={cn(
                selected === item.value
                  ? "bg-[#20483F]/10 text-[#20483F] font-semibold"
                  : "text-[#667085]",
                "py-1.5 px-3 cursor-pointer rounded-md text-sm"
              )}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StatusSwitcher;
