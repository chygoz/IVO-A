import React from "react";

type NormalStatCardProps = {
  title: string;
  value: string;
};
export function NormalStatCard({ title, value }: NormalStatCardProps) {
  return (
    <div className="min-h-20 md:min-h-40 p-4 rounded-md bg-gray-50">
      <div>{title}</div>
      <p className="text-xl md:text-4xl">{value}</p>
    </div>
  );
}
