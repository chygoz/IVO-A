"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

interface SearchProps {
  placeholder?: string;
  className?: string;
  delay?: number;
}

export default function SearchComponent({
  placeholder = "Search...",
  className = "",
  delay = 300,
}: SearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize with current query from URL
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");

  // Track if user is currently typing
  const [isTyping, setIsTyping] = useState(false);

  // Create a debounced function to update the URL
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateQuery = useCallback(
    debounce((value: string) => {
      setIsTyping(false);

      // Create new URLSearchParams
      const params = new URLSearchParams(searchParams.toString());

      // Update or remove the query parameter
      if (value) {
        params.set("query", value);
      } else {
        params.delete("query");
      }

      // Update URL without refreshing the page
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.push(newUrl, { scroll: false });
    }, delay),
    [router, searchParams, delay]
  );

  // Handle input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsTyping(true);
    debouncedUpdateQuery(value);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm("");
    setIsTyping(false);

    // Create new URLSearchParams without the query
    const params = new URLSearchParams(searchParams.toString());
    params.delete("query");

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  };

  // Update local state if URL query param changes externally
  useEffect(() => {
    const currentQuery = searchParams.get("query") || "";
    if (currentQuery !== searchTerm && !isTyping) {
      setSearchTerm(currentQuery);
    }
  }, [searchParams, searchTerm, isTyping]);

  return (
    <div className={`relative flex items-center ${className}`}>
      <div className="absolute left-3 text-gray-400">
        <Search size={18} />
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={placeholder}
        aria-label="Search"
        className="pl-10 pr-10 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {searchTerm && (
        <button
          onClick={handleClearSearch}
          className="absolute right-3 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <span className="text-xl font-medium">×</span>
        </button>
      )}

      {isTyping && (
        <div className="absolute right-10 text-sm text-gray-400">
          Searching...
        </div>
      )}
    </div>
  );
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
