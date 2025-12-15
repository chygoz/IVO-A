import React from "react";
import { Inbox } from "lucide-react";

interface EmptyTableProps {
  title: string;
  subTitle?: string;
  icon?: React.ReactNode;
}

const EmptyTable: React.FC<EmptyTableProps> = ({
  title,
  subTitle,
  icon = <Inbox size={48} />,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-6 mb-4 text-gray-500 dark:text-gray-400">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {subTitle && (
        <p className="text-gray-500 dark:text-gray-400 max-w-md">{subTitle}</p>
      )}
    </div>
  );
};

export default EmptyTable;
