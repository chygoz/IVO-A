import { fetchAPI } from "../config";
import { MEDIA_BASE_URL } from "./config";
import { MediaResponse } from "./types";

/**
 * Fetches the current user's media from the API
 * @returns Promise with media results
 */
export const getMyMedia = async (): Promise<MediaResponse> => {
  try {
    const res = await fetchAPI({
      url: `${MEDIA_BASE_URL}/me/list`,
      tags: ["my-media"],
    });

    if (res?.error) {
      console.error("Error fetching media:", res.error);
      return {
        data: {
          media: [],
        },
      };
    }

    return res;
  } catch (error) {
    console.error("Failed to fetch media:", error);
    return {
      data: {
        media: [],
      },
    };
  }
};
