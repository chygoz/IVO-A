import { fetchAPI } from "./config";

export const forgotPasswordAction = async (credentials: { email: string }) => {
  const res = await fetchAPI({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/auth/password/forgot`,
    body: credentials,
  });

  return res;
};
