import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  showFirstLast?: boolean;
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = false,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange?.(page);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      // If 5 or fewer total pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include current page
      pages.push(currentPage);

      // Add pages before current page
      if (currentPage > 1) {
        pages.unshift(currentPage - 1);
      }
      if (currentPage > 2) {
        pages.unshift(currentPage - 2);
      }

      // Add pages after current page
      if (currentPage < totalPages) {
        pages.push(currentPage + 1);
      }
      if (currentPage < totalPages - 1) {
        pages.push(currentPage + 2);
      }

      // Ensure we have at most 5 pages
      while (pages.length > 5) {
        //@ts-expect-error
        if (pages[0] > 1) {
          pages.shift();
        } else {
          pages.pop();
        }
      }

      // Add ellipses if needed
      //@ts-expect-error
      if (pages[0] > 1) {
        pages.unshift("...");
        if (showFirstLast) {
          pages.unshift(1);
        }
      }

      //@ts-expect-error
      if (pages[pages.length - 1] < totalPages) {
        pages.push("...");
        if (showFirstLast) {
          pages.push(totalPages);
        }
      }
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1">
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <span className="sr-only">Previous page</span>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((page, index) => {
        if (page === "...") {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
              ...
            </span>
          );
        }

        return (
          <Button
            key={index}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(page as number)}
          >
            <span>{page}</span>
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <span className="sr-only">Next page</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
};
