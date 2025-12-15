import { fetchAPI } from "../config";
import { RESELLERS_BASE_URL } from "./config";
import { ResellersResponse } from "./types";

export const getResellers = async (params: {
  p: number;
}): Promise<ResellersResponse> => {
  const res = await fetchAPI({
    url: `${RESELLERS_BASE_URL}?page=${params.p}`,
    tags: ["resellers"],
  });

  if (res?.error) {
    return {
      data: {
        results: [],
        metadata: {
          total: 0,
          totalPages: 1,
          currentPage: 1,
          pageSize: 10,
          hasNextPage: false,
          hasPrevPage: false,
        },
      },
    };
  }

  return res;
};

export const checkResellersToSendLogin = async (): Promise<{
  data: { count: number };
}> => {
  const res = await fetchAPI({
    url: `${RESELLERS_BASE_URL}/send-login`,
    tags: ["resellers"],
  });

  if (res?.error) {
    return {
      data: {
        count: 0,
      },
    };
  }

  return res;
};
