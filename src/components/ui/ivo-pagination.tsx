import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type IVOPaginationProps = {
  currentPage: number;
  totalPages: number;
  limit: number;
  url: string;
};

export function IVOPagination({
  currentPage,
  totalPages,
  limit,
  url,
}: IVOPaginationProps) {
  // Helper function to generate the pagination links
  const generatePageLinks = () => {
    const pages = [];
    const maxDisplayedPages = 5; // Adjust this value as needed
    const startPage = Math.max(
      currentPage - Math.floor(maxDisplayedPages / 2),
      1
    );
    const endPage = Math.min(startPage + maxDisplayedPages - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`${url}?page=${i}`}
            isActive={i === currentPage}
            className={
              i === currentPage
                ? "bg-primary text-white rounded-[100%] border-none"
                : ""
            }
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={currentPage === 1}
            href={currentPage > 1 ? `${url}?page=${currentPage - 1}` : ""}
            className={cn("rounded-md", currentPage === 1 ? "pointer-events-none opacity-50" : "")}
          // disabled={currentPage === 1}
          />
        </PaginationItem>

        {/* Page Links */}
        {generatePageLinks()}

        {/* Ellipsis if necessary */}
        {totalPages > 5 && currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages ? `${url}?page=${currentPage + 1}` : ""
            }
            className={cn("rounded-md", currentPage === totalPages ? "pointer-events-none opacity-50" : "")}
            aria-disabled={currentPage === totalPages}
          // disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
