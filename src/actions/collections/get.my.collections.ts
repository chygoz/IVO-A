import { fetchAPI } from "../config";
import { COLLECTION_BASE_URL } from "./config";
import { CollectionResponse } from "./types";

/**
 * Fetches collections belonging to the current user
 * @returns Promise with collection results
 */
export const getMyCollections = async (): Promise<CollectionResponse> => {
  try {
    const res = await fetchAPI({
      url: `${COLLECTION_BASE_URL}/me`,
      tags: ["my-collections"],
    });

    if (res?.error) {
      console.error("Error fetching collections:", res.error);
      return {
        data: {
          results: [],
        },
      };
    }

    return res;
  } catch (error) {
    console.error("Failed to fetch collections:", error);
    return {
      data: {
        results: [],
      },
    };
  }
};
