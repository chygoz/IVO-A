import { fetchAPI } from "../config";
import { CLIENT_URL, SERVER_URL } from "./util";

export const uploadImage = async (
  formData: FormData
): Promise<{ imageUrl: string; publicId: string }> => {
  const res = await fetchAPI({
    url: SERVER_URL,
    method: "POST",
    body: formData,
    form: true,
  });

  if (res?.error) {
    throw new Error(res.details || "Failed upload image");
  }

  return res;
};

export const deleteImage = async (
  publicId: string
): Promise<{ message: string }> => {
  const res = await fetchAPI({
    url: SERVER_URL,
    method: "DELETE",
    body: [publicId],
  });

  if (res?.error) {
    throw new Error(res.details || "Failed to delete image");
  }

  return res;
};
