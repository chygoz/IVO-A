"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/ui/file-upload";
import { cn } from "@/lib/utils";
import Image from "next/image";

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        SVG, PNG, JPG or GIF
      </p>
    </>
  );
};

type UploadImageProps = {
  image: string;
  setImage: (image: string) => void;
  text: string;
  className?: string;
};

function UploadImage({
  image,
  setImage,
  text = "Change Image",
  className,
}: UploadImageProps) {
  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn(className)}>{text}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="hidden">
          <DialogTitle>{text}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FileUploader
          value={image}
          onValueChange={setImage}
          dropzoneOptions={dropZoneConfig}
          className="relative bg-background rounded-lg p-2"
        >
          <FileInput className="outline-dashed outline-1 outline-white">
            <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
              <FileSvgDraw />
            </div>
          </FileInput>
          <FileUploaderContent>
            {image && (
              <FileUploaderItem>
                <Image
                  src={image.split("|")[0] || ""}
                  alt={"photo"}
                  width={48}
                  height={48}
                  className="object-cover rounded-md"
                />
              </FileUploaderItem>
            )}
          </FileUploaderContent>
        </FileUploader>
        {image && (
          <Button asChild>
            <DialogClose>Continue</DialogClose>
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default UploadImage;
