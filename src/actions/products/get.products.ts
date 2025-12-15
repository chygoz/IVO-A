import { fetchAPI } from "../config";
import { PRODUCT_BASE_URL } from "./config";
import { ProductsResponse } from "./types";

export const getProducts = async (
  businessId: string,
  page: number = 1,
): Promise<ProductsResponse> => {
  const res = await fetchAPI({
    url: `${PRODUCT_BASE_URL}?business=${businessId}&p=${page}`,
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
      },
    };
  }

  return res;
};
