import { fetchAPI } from "../config";
import { PRODUCT_BASE_URL } from "./config";
import { CreateProductInput } from "./types";

export const createProduct = async (data: CreateProductInput): Promise<any> => {
  const res = await fetchAPI({
    url: `${PRODUCT_BASE_URL}`,
    method: "POST",
    body: data,
  });

  if (res?.error) {
    throw new Error(res.details);
  }

  return res;
};
