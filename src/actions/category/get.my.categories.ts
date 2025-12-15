import { fetchAPI } from "../config";
import { CATEGORY_BASE_URL } from "./config";
import { CategoryResponse } from "./types";

/**
 * Fetches all categories from the API
 * @returns Promise with category results
 */
export const getCategories = async (): Promise<CategoryResponse> => {
  try {
    const res = await fetchAPI({
      url: `${CATEGORY_BASE_URL}`,
      tags: ["categories"], // Add tag for revalidation
    });

    if (res?.error) {
      console.error("Error fetching categories:", res.error);
      return {
        data: {
          results: [],
        },
      };
    }

    return res;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return {
      data: {
        results: [],
      },
    };
  }
};
