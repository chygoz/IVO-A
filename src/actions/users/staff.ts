import { fetchAPI } from "../config";
import { USERS_BASE_URL } from "./config";
import { CreateStaffDTO, User } from "./types";

export const createStaff = async (
  input: CreateStaffDTO
): Promise<{ data: User }> => {
  const res = await fetchAPI({
    method: "POST",
    url: `${USERS_BASE_URL}/staff`,
    body: {
      ...input,
    },
  });

  if (res?.error) {
    throw Error(res.details);
  }

  return res;
};
