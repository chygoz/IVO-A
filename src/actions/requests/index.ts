import { fetchAPI } from "../config";
import { CLIENT_URL, SERVER_URL, IRequest, NewRequest } from "./util";

export const getRequest = async (
  requestId: string
): Promise<{ data: IRequest }> => {
  const status = "pending";
  const res = await fetchAPI({
    url: `${SERVER_URL}/${requestId}?status=${status}`,
    method: "GET",
    tags: [`request-${requestId}`],
  });

  if (res?.error) {
    throw new Error(res.details || "Failed to get request");
  }

  return res;
};

export const closeRequest = async (
  requestId: string
): Promise<{ message: string; status: "success" | "failed" }> => {
  const res = await fetchAPI({
    url: `${SERVER_URL}/${requestId}/close`,
    method: "POST",
  });

  if (res?.error) {
    throw new Error(res.details || "Failed to close request");
  }

  return res;
};

export const addRequest = async (
  request: NewRequest
): Promise<{ data: IRequest }> => {
  const res = await fetchAPI({
    url: SERVER_URL,
    method: "POST",
    body: request,
  });

  if (res?.error) {
    throw new Error(res.details || "Failed to add request");
  }

  return res;
};
