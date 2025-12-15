import React, { useState } from "react";
import {
  Upload,
  FileSpreadsheet,
  Download,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { UploadStatus } from "./types";
import { downloadTemplate } from "./utils";

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  onClearFile: () => void;
  file: { name: string; size: number } | null;
  uploadStatus: UploadStatus | null;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelected,
  onClearFile,
  file,
  uploadStatus,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    if (
      selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      selectedFile.type === "application/vnd.ms-excel"
    ) {
      onFileSelected(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    processFile(droppedFile);
  };

  return (
    <>
      {!file && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging ? "border-primary bg-green-50" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-3">
            <Upload size={28} className="text-primary" />
            <p className="text-sm font-medium">
              Drag and drop your Excel file here or
            </p>
            <label htmlFor="reseller-file" className="cursor-pointer">
              <span className="px-3 py-2 text-sm bg-green-100 text-primary rounded-md hover:bg-primary hover:text-white transition-colors">
                Browse files
              </span>
              <Input
                id="reseller-file"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500">
              Supports .xlsx and .xls files
            </p>
          </div>
        </div>
      )}

      {file && (
        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-md border border-primary">
          <FileSpreadsheet size={20} className="text-primary-500" />
          <div className="flex-1 truncate">
            <p className="text-sm font-medium">{file.name}</p>
            <p className="text-xs text-gray-500">
              {Math.round(file.size / 1024)} KB
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFile}
            className="h-8 w-8 p-0 rounded-full"
          >
            ✕
          </Button>
        </div>
      )}

      {!file && (
        <div className="flex items-center gap-2 pt-2">
          <Button
            variant="outline"
            onClick={downloadTemplate}
            className="flex items-center gap-2 text-primary border-primary hover:bg-primary-50 hover:text-primary"
          >
            <Download size={16} />
            Download Template
          </Button>
          <span className="text-xs text-gray-500">
            Don&apos;t have a template? Download it here.
          </span>
        </div>
      )}

      {uploadStatus && (
        <Alert
          variant={uploadStatus.type === "error" ? "destructive" : "default"}
          className={
            uploadStatus.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : ""
          }
        >
          <div className="flex items-center gap-2">
            {uploadStatus.type === "error" ? (
              <AlertCircle size={18} className="text-red-500" />
            ) : (
              <CheckCircle size={18} className="text-green-500" />
            )}
            <AlertTitle>
              {uploadStatus.type === "error" ? "Error" : "Success"}
            </AlertTitle>
          </div>
          <AlertDescription>{uploadStatus.message}</AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default FileUploader;
