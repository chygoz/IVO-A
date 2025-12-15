"use server";

import { revalidateTag } from "next/cache";
import { fetchAPI } from "../config";
import { BLANK_BASE_URL } from "./config";

export async function deleteBlank(id: string) {
  const res = await fetchAPI({
    url: `${BLANK_BASE_URL}/${id}`,
    method: "DELETE",
  });
  if (res.error) {
    throw new Error(res.details)
  }

  return res;
}
