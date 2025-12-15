import { fetchAPI } from "../config";
import { MAIL_BASE_URL } from "./utils";

export const sendResellersWelcomeMail = async (): Promise<null> => {
  const res = await fetchAPI({
    url: `${MAIL_BASE_URL}/welcome`,
    method: "POST",
  });
  if (res?.error) {
    throw new Error(res.details);
  }

  return res;
};
