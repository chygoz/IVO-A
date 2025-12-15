import { fetchAPI } from "../config";
import { PRODUCT_BASE_URL } from "./config";
import { ProductResponse } from "./types";

export const getProduct = async (
  slug: string,
  session?: any
): Promise<ProductResponse> => {
  const res = await fetchAPI({
    url: `${PRODUCT_BASE_URL}/${slug}`,
    session, // Pass session to fetchAPI
  });

  if (res?.error) {
    return {
      data: null,
    };
  }

  return res;
};
