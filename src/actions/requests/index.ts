import { CLIENT_URL, SERVER_URL, IRequest, NewRequest } from "./util";

export const getRequest = async (
  requestId: string
): Promise<{ data: IRequest }> => {
  const status = "pending";
  const res = await fetch(`${SERVER_URL}/${requestId}?status=${status}`, {
    method: "GET",
    next: {
      tags: [`request-${requestId}`],
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export const closeRequest = async (
  requestId: string
): Promise<{ message: string; status: "success" | "failed" }> => {
  const res = await fetch(`${CLIENT_URL}/${requestId}/close`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export const addRequest = async (
  request: NewRequest
): Promise<{ data: IRequest }> => {
  const res = await fetch(`${CLIENT_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  return res.json();
};
