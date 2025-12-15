import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IVOSelect } from "@/components/ui/ivo-select";

type SelectedImage = {
  image: string;
  type: string;
  mode: string;
  view: string;
};

type ProductImagesTableProps = {
  selectedImages: SelectedImage[];
  onChange: (selectedImages: SelectedImage[]) => void;
  setSelect: Set<string>;
  setSelectedImages: React.Dispatch<React.SetStateAction<Set<string>>>;
};

function ProductImageTable({
  selectedImages,
  onChange,
  setSelect,
  setSelectedImages,
}: ProductImagesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(selectedImages.length / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = selectedImages.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  function handleUpdateImages(
    images: SelectedImage[],
    update: SelectedImage,
    index: number
  ) {
    onChange(
      images.map((value, indx) => {
        if (indx === index) {
          return update;
        }
        return value;
      })
    );
  }

  function handleDeleteImages(images: SelectedImage[], index: number) {
    onChange(images.filter((_, indx) => indx !== index));
    const im = images.find((_, indx) => indx === index);
    const newSelection = setSelect;
    if (im) {
      newSelection.delete(im.image);
    }
    setSelectedImages(newSelection);
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Image</TableHead>
            <TableHead>View</TableHead>
            <TableHead>Mode</TableHead>
            <TableHead className="">Type</TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((image, index) => (
            <TableRow key={index.toString()}>
              <TableCell className="font-medium">
                <Image
                  className="object-cover rounded-lg w-[50px] h-[50px]"
                  src={image.image}
                  width={800}
                  height={800}
                  alt={""}
                />
              </TableCell>
              <TableCell>
                <IVOSelect
                  className="w-full"
                  options={[
                    { label: "Front", value: "front" },
                    { label: "Back", value: "back" },
                    { label: "Side", value: "side" },
                  ]}
                  onChange={(value) => {
                    handleUpdateImages(
                      selectedImages,
                      {
                        ...image,
                        view: value,
                      },
                      index
                    );
                  }}
                  value={image.view}
                />
              </TableCell>
              <TableCell>
                <IVOSelect
                  className="w-full"
                  options={[
                    { label: "Product", value: "product" },
                    { label: "Model", value: "model" },
                  ]}
                  onChange={(value) => {
                    handleUpdateImages(
                      selectedImages,
                      {
                        ...image,
                        mode: value,
                      },
                      index
                    );
                  }}
                  value={image.mode}
                />
              </TableCell>
              <TableCell className="">
                <IVOSelect
                  className="w-full"
                  options={[
                    { label: "Full", value: "full" },
                    { label: "Half", value: "half" },
                    { label: "Close Up", value: "close-up" },
                  ]}
                  onChange={(value) => {
                    handleUpdateImages(
                      selectedImages,
                      {
                        ...image,
                        type: value,
                      },
                      index
                    );
                  }}
                  value={image.type}
                />
              </TableCell>
              <TableCell className="">
                <button
                  onClick={() => {
                    handleDeleteImages(selectedImages, index);
                  }}
                  type="button"
                  className="p-1 w-fit rounded-sm bg-red-100 text-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </div>
        <div className="space-x-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductImageTable;
