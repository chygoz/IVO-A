import { fetchAPI } from "../config";
import { Transaction } from "../transactions/utils";
import { SERVER_URL, CLIENT_URL } from "./utils";

export type Invite = {
  email: string;
  date: Date;
};

export type Member = {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  status?: "active" | "suspened";
  phone?: string;
  role: string;
  dateJoined: Date;
};

export type Partner = {
  name: string;
  _id: string;
  description?: string;
  identifier: string;
  verified: boolean;
  role: string;
  owner: {
    email: string;
    firstName: string;
    lastName: string;
    _id: string;
  };
};

export type Customer = {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    avatar?: string;
    username: string;
  };
  createdAt: Date;
};

export const getPartners = async (): Promise<{
  data: { results: Partner[] };
}> => {
  const res = await fetchAPI({
    url: `${SERVER_URL}`,
    tags: ["partners"],
  });

  return res;
};

export const getMyTransactions = async (): Promise<{
  data: { results: Transaction[] };
}> => {
  const res = await fetch(`${CLIENT_URL}/transactions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export const getMyMembers = async (): Promise<{
  data: { results: Member[] };
}> => {
  const res = await fetchAPI({ url: `${SERVER_URL}/members` });

  if (res?.error) {
    return { data: { results: [] } };
  }

  return res;
};

export const getMyInvites = async (): Promise<{
  data: { results: Invite[] };
}> => {
  const res = await fetch(`${CLIENT_URL}/invites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export const inviteMember = async (
  emails: string[]
): Promise<{ data: Invite }> => {
  const res = await fetch(`${CLIENT_URL}/invites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emails }),
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.message || res.statusText);
  }

  return res.json();
};

export const resendInvite = async (
  email: string
): Promise<{ data: Invite }> => {
  const res = await fetch(`${CLIENT_URL}/invites/resend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.message || res.statusText);
  }

  return res.json();
};

export const cancelInvite = async (
  email: string
): Promise<{ data: Invite }> => {
  const res = await fetch(`${CLIENT_URL}/invites/cancel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.message || res.statusText);
  }

  return res.json();
};

export const removePartnerUser = async (
  userId: string
): Promise<any> => {
  const res = await fetchAPI({
    url: `${CLIENT_URL}/members/${userId}`,
    method: "delete",
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.message || res.statusText);
  }

  return res.json();
};

export const changePartnerUserRole = async (
  userId: string,
  role: string
): Promise<any> => {
  const res = await fetchAPI({
    url: `${CLIENT_URL}/members/${userId}`,
    method: "PUT",
    body: { role }
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.message || res.statusText);
  }

  return res.json();
};
