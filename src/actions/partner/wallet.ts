"use server";
import { auth } from "@/auth";
import { fetchAPI } from "../config";
import { IWallet } from "./utils";
const SERVER_URL = process.env.SERVER_API_URL;

export const getMyWallet = async (): Promise<{
  data: IWallet;
}> => {
  const session = await auth();
  const isUser = session?.user?.type === "user";
  let url = "api/v1/partners/wallet";
  if (isUser) {
    url = "api/v1/users/me/wallet";
  }

  const res = await fetchAPI({ url: `${SERVER_URL}/${url}` });
  return res;
};
