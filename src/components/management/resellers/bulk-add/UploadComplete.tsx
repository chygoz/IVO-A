// src/components/bulk-resellers/UploadComplete.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { UploadStats } from "./types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface UploadCompleteProps {
  stats: UploadStats;
  onReset: () => void;
}

const UploadComplete: React.FC<UploadCompleteProps> = ({ stats, onReset }) => {
  return (
    <div className="border-t pt-4">
      <div className="flex flex-col items-center gap-4 py-4">
        <CheckCircle size={48} className="text-primary" />
        <h3 className="text-lg font-medium">Upload Complete</h3>
        <div className="flex gap-8">
          <div className="text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-gray-500">Total</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {stats.successful}
            </p>
            <p className="text-sm text-gray-500">Successful</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
            <p className="text-sm text-gray-500">Failed</p>
          </div>
        </div>

        {stats.errors && stats.errors.length > 0 && (
          <div className="w-full mt-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="errors">
                <AccordionTrigger className="text-red-600 font-medium">
                  View Failed Uploads ({stats.errors.length})
                </AccordionTrigger>
                <AccordionContent>
                  <Alert variant="destructive">
                    <AlertDescription>
                      <div className="text-sm font-medium">Failed Uploads:</div>
                      <ul className="mt-2 text-sm max-h-60 overflow-y-auto">
                        {stats.errors.map((error, index) => (
                          <li key={index} className="mt-1">
                            {error.email}: {error.error}
                          </li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        <Button onClick={onReset} className="mt-4">
          Upload Another File
        </Button>
      </div>
    </div>
  );
};

export default UploadComplete;
