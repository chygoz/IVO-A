import { fetchAPI } from "../config";
import { USERS_BASE_URL } from "./config";
import { CreateResellerDTO, ResellersResponse, User } from "./types";

export const getResellers = async (params: {
  p: number;
  q?: string;
}): Promise<ResellersResponse> => {
  const res = await fetchAPI({
    url: `${USERS_BASE_URL}/resellers?type=reseller&l=10&p=${params.p || 1}${
      params.q ? `&q=${params.q}` : ""
    }`,
    tags: ["users-resellers"],
  });

  if (res?.error) {
    return {
      data: {
        results: [],
        metadata: {
          total: 0,
          page: 1,
          limit: 10,
          pages: 1,
        },
      },
    };
  }

  return res;
};

export const createReseller = async (
  input: CreateResellerDTO
): Promise<{ data: User }> => {
  const res = await fetchAPI({
    method: "POST",
    url: `${USERS_BASE_URL}/resellers`,
    body: {
      ...input,
      mode: "onboard",
    },
  });

  if (res?.error) {
    throw Error(res.details);
  }

  return res;
};
