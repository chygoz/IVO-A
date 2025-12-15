// src/components/bulk-resellers/BulkAddResellers.tsx
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Plus, Upload } from "lucide-react";
import { usePathname } from "next/navigation";
import { revalidatePage } from "@/actions/revalidate.tag";
import { Reseller, InvalidRow, UploadStatus, UploadStats } from "./types";
import { parseExcel } from "./utils";
import FileUploader from "./FileUploader";
import ValidationSummary from "./ValidationSummary";
import UploadProgress from "./UploadProgress";
import UploadComplete from "./UploadComplete";

function BulkAddResellers() {
  const [file, setFile] = useState<{ name: string; size: number } | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);
  const [validResellers, setValidResellers] = useState<Reseller[]>([]);
  const [invalidRows, setInvalidRows] = useState<InvalidRow[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadStats, setUploadStats] = useState<UploadStats>({
    total: 0,
    successful: 0,
    failed: 0,
  });
  const pathname = usePathname();

  const handleFileSelected = async (selectedFile: File) => {
    if (
      selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      selectedFile.type === "application/vnd.ms-excel"
    ) {
      setFile(selectedFile);
      setUploadStatus(null);
      setUploadComplete(false);

      try {
        const { valid, invalid } = await parseExcel(selectedFile);
        setValidResellers(valid);
        setInvalidRows(invalid);
        setShowSummary(true);
      } catch (error) {
        console.error("Error parsing Excel file:", error);
        setUploadStatus({
          type: "error",
          message: "Error parsing Excel file. Please check the format.",
        });
      }
    } else {
      setUploadStatus({
        type: "error",
        message: "Please upload an Excel file (.xlsx or .xls)",
      });
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setValidResellers([]);
    setInvalidRows([]);
    setShowSummary(false);
    setUploadStatus(null);
  };

  const handleFinalUpload = () => {
    setShowUploadProgress(true);
    setShowSummary(false);
  };

  const handleUploadCompletion = (stats: UploadStats) => {
    setUploadStats(stats);
    setShowUploadProgress(false);
    setUploadComplete(true);
    setUploadStatus({
      type: "success",
      message: `Successfully uploaded ${stats.successful} out of ${stats.total} resellers (${stats.failed} failed)`,
    });
  };

  const handleReset = () => {
    setFile(null);
    setValidResellers([]);
    setInvalidRows([]);
    setShowSummary(false);
    setUploadComplete(false);
    setUploadStatus(null);
    revalidatePage(pathname);
  };

  return (
    <div className="p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2 bg-primary hover:bg-primary">
            <Plus size={18} />
            Bulk Add Resellers
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full sm:max-w-4xl px-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <FileSpreadsheet className="text-primary-500" />
              Bulk Add Resellers
            </DialogTitle>
            <DialogDescription>
              Upload an Excel file containing reseller information or download
              our template.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4 w-full">
            {!showUploadProgress && !uploadComplete && (
              <FileUploader
                onFileSelected={handleFileSelected}
                onClearFile={handleClearFile}
                file={file}
                uploadStatus={uploadStatus}
              />
            )}

            {showSummary && (
              <ValidationSummary
                validResellers={validResellers}
                invalidRows={invalidRows}
              />
            )}

            {showUploadProgress && validResellers.length > 0 && (
              <UploadProgress
                resellers={validResellers}
                onComplete={handleUploadCompletion}
              />
            )}

            {uploadComplete && (
              <UploadComplete stats={uploadStats} onReset={handleReset} />
            )}
          </div>

          {showSummary && validResellers.length > 0 && (
            <DialogFooter>
              <Button
                onClick={handleFinalUpload}
                className="flex items-center gap-2 bg-primary hover:bg-primary"
              >
                <Upload size={16} />
                Proceed to Upload
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BulkAddResellers;
