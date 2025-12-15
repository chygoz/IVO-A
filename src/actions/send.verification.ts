import { fetchAPI } from "./config";

export const sendVerification = async (
  email: string
): Promise<{ data: "" }> => {
  const res = await fetchAPI({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/auth/send/otp`,
    body: { email },
  });

  return res;
};
