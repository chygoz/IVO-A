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
  const res = await fetchAPI({
    url: `${SERVER_URL}/transactions`,
    method: "GET",
  });

  if (res?.error) {
    return { data: { results: [] } };
  }

  return res;
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
  const res = await fetchAPI({
    url: `${SERVER_URL}/invites`,
    method: "GET",
  });

  if (res?.error) {
    return { data: { results: [] } };
  }

  return res;
};

export const inviteMember = async (
  emails: string[]
): Promise<{ data: Invite }> => {
  const res = await fetchAPI({
    url: `${SERVER_URL}/invites`,
    method: "POST",
    body: { emails },
  });

  if (res?.error) {
    throw new Error(res.message || res.details);
  }

  return res.json();
};

export const resendInvite = async (
  email: string
): Promise<{ data: Invite }> => {
  const res = await fetchAPI({
    url: `${SERVER_URL}/invites/resend`,
    method: "POST",
    body: { email },
  });

  if (res?.error) {
    throw new Error(res.message || res.details);
  }

  return res;
};

export const cancelInvite = async (
  email: string
): Promise<{ data: Invite }> => {
  const res = await fetchAPI({
    url: `${SERVER_URL}/invites/cancel`,
    method: "POST",
    body: { email },
  });

  if (res?.error) {
    throw new Error(res.message || res.details);
  }

  return res;
};

export const removePartnerUser = async (
  userId: string
): Promise<any> => {
  const res = await fetchAPI({
    url: `${SERVER_URL}/members/${userId}`,
    method: "DELETE",
  });

  if (res?.error) {
    throw new Error(res.message || res.details);
  }

  return res;
};

export const changePartnerUserRole = async (
  userId: string,
  role: string
): Promise<any> => {
  const res = await fetchAPI({
    url: `${SERVER_URL}/members/${userId}`,
    method: "PUT",
    body: { role }
  });

  if (res?.error) {
    throw new Error(res.message || res.details);
  }

  return res;
};
