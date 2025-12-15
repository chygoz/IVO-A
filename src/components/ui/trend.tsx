import React from "react";

type TrendProps = {
  label: "up" | "down";
  value: number | string;
};

function Trend({ label, value }: TrendProps) {
  if (label === "up") {
    return (
      <div className="flex gap-1 items-center text-[10px]">
        <span>{value}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-2 text-green-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex gap-1 items-center text-[10px]">
      <span>{value}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-2 text-red-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25"
        />
      </svg>
    </div>
  );
}

export default Trend;
