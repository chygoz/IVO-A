"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, X } from "lucide-react";
import { OrderDetailType } from "@/types/order";
import Image from "next/image";

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderDetailType;
  documentType?: "label" | "invoice" | "other";
  title: string;
}

export function DocumentViewer({
  isOpen,
  onClose,
  order,
  documentType = "label",
  title,
}: DocumentViewerProps) {
  const [contentUrl, setContentUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fileType, setFileType] = useState<"pdf" | "image" | "other">("other");

  useEffect(() => {
    if (isOpen && order) {
      setIsLoading(true);

      // Get document content from order
      if (documentType === "label" && order.shipmentDetails?.label) {
        const label = order.shipmentDetails.label;

        // If we already have a URL in the label object
        if (label.url) {
          setContentUrl(label.url);
          setFileType(getFileTypeFromUrl(label.url));
        }
        // Otherwise, create a blob URL from the content
        else if (label.content) {
          try {
            // Determine content type based on imageFormat
            const contentType =
              label.imageFormat === "PDF"
                ? "application/pdf"
                : label.imageFormat === "PNG"
                ? "image/png"
                : "image/jpeg";

            // Create blob and URL
            const blob = base64ToBlob(label.content, contentType);
            const url = URL.createObjectURL(blob);
            setContentUrl(url);
            setFileType(
              label.imageFormat.toLowerCase() === "pdf" ? "pdf" : "image"
            );
          } catch (error) {
            console.error("Error creating blob URL", error);
          }
        }
      }
      // For other document types (if implemented)
      else {
        setContentUrl(null);
        setFileType("other");
      }

      setIsLoading(false);
    }

    // Cleanup function to revoke any object URLs when component unmounts or dialog closes
    return () => {
      if (contentUrl && contentUrl.startsWith("blob:")) {
        URL.revokeObjectURL(contentUrl);
      }
    };
    //eslint-disable-next-line
  }, [isOpen, order, documentType]);

  // Helper function to determine file type from URL
  const getFileTypeFromUrl = (url: string): "pdf" | "image" | "other" => {
    const extension = url.split(".").pop()?.toLowerCase();
    if (extension === "pdf") return "pdf";
    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension || ""))
      return "image";
    return "other";
  };

  // Helper function to convert base64 to Blob
  const base64ToBlob = (base64: string, contentType: string): Blob => {
    // Remove data URL prefix if present
    const base64Data = base64.includes("base64,")
      ? base64.split("base64,")[1]
      : base64;

    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  // Download the document
  const handleDownload = () => {
    if (!contentUrl) return;

    const filename = `${documentType}-${order.orderId}.${
      fileType === "pdf" ? "pdf" : "png"
    }`;

    const a = document.createElement("a");
    a.href = contentUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="p-4 border-b">
          <div className="flex justify-between items-center">
            <DialogTitle>{title}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 min-h-[400px] overflow-auto p-4 flex items-center justify-center bg-neutral-50">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin h-8 w-8 border-2 border-[#20483f] rounded-full border-t-transparent"></div>
              <p className="mt-2 text-sm text-neutral-500">
                Loading document...
              </p>
            </div>
          ) : !contentUrl ? (
            <div className="text-center">
              <p className="text-neutral-500">
                No document available to preview.
              </p>
            </div>
          ) : fileType === "image" ? (
            <div className="flex items-center justify-center">
              <Image
                src={contentUrl}
                width={1000}
                height={1000}
                alt={title}
                className="max-w-full max-h-[60vh] object-contain"
              />
            </div>
          ) : fileType === "pdf" ? (
            <div className="w-full h-[60vh]">
              <iframe
                src={`${contentUrl}#toolbar=0&navpanes=0`}
                className="w-full h-full border-0"
                title={title}
              />
            </div>
          ) : (
            <div className="text-center">
              <p className="text-neutral-500">
                Preview not available for this file type.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4 mr-2" />
                Download File Instead
              </Button>
            </div>
          )}
        </div>

        {contentUrl && (
          <DialogFooter className="p-4 border-t">
            <div className="flex space-x-2 justify-end w-full">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              {contentUrl && (
                <Button
                  variant="secondary"
                  onClick={() => window.open(contentUrl, "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in New Tab
                </Button>
              )}
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
