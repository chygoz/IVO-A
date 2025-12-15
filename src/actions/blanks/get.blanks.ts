import { fetchAPI } from "../config";
import { GET_BLANKS_BASE_URL } from "./config";
import type { BlankFilterParams, MultiBlankResponse } from "./types";

export const getBlanks = async (
  params: BlankFilterParams = {},
): Promise<MultiBlankResponse> => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();
  const urlWithParams = `${GET_BLANKS_BASE_URL}${queryString ? `?${queryString}` : ""
    }`;

  const res = await fetchAPI({
    url: urlWithParams,
  });
  if (res?.error) {
    return {
      data: {
        results: [],
        metadata: {
          totalCount: 0,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
        filters: {},
      },
    };
  }

  return res;
};
