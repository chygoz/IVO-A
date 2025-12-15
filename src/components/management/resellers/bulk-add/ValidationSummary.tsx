import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Reseller, InvalidRow } from "./types";

interface ValidationSummaryProps {
  validResellers: Reseller[];
  invalidRows: InvalidRow[];
}

const ValidationSummary: React.FC<ValidationSummaryProps> = ({
  validResellers,
  invalidRows,
}) => {
  return (
    <div className="border-t flex flex-col pt-4 w-fit !overflow-x-scroll">
      <p className="text-sm font-medium mb-2">
        You are trying to upload {validResellers.length + invalidRows.length}{" "}
        resellers
      </p>

      {invalidRows.length > 0 && (
        <div className="mb-4">
          <p className="text-red-500 font-semibold mb-2">
            {invalidRows.length} row(s) are invalid and will be skipped:
          </p>
          <ul className="text-sm list-disc list-inside text-red-600 max-h-[400px] overflow-y-auto">
            {invalidRows.map((row, idx) => (
              <li key={idx}>
                Row {row.rowNumber}: {row.reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      {validResellers.length > 0 && (
        <div className="relative border rounded">
          <div className="overflow-x-scroll overflow-y-auto max-h-60">
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] truncate">Email</TableHead>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>DOB</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Business Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {validResellers.map((reseller, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="truncate">{reseller.email}</TableCell>
                    <TableCell>{reseller.firstName}</TableCell>
                    <TableCell>{reseller.lastName}</TableCell>
                    <TableCell>{reseller.dob}</TableCell>
                    <TableCell>{reseller.gender}</TableCell>
                    <TableCell>{reseller.phone}</TableCell>
                    <TableCell>{reseller.address}</TableCell>
                    <TableCell>{reseller.businessName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidationSummary;
