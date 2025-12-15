import { fetchAPI } from "../config";
import { Transaction, SERVER_URL } from "./utils";

export const getMyTransactions = async (): Promise<{
  data: { results: Transaction[]; isPartner: boolean };
}> => {
  const res = await fetchAPI({ url: `${SERVER_URL}/me` });

  return res;
};
