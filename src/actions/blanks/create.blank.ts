import { fetchAPI } from "../config";
import { CreateProductInput } from "../products/types";
import { BLANK_BASE_URL } from "./config";

export const createBlank = async (data: CreateProductInput): Promise<any> => {
  const res = await fetchAPI({
    url: `${BLANK_BASE_URL}`,
    method: "POST",
    body: data,
  });

  if (res?.error) {
    throw new Error(res.details);
  }

  return res;
};
