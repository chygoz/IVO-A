export const SERVER_URL = `${process.env.SERVER_API_URL}/api/v1/businesses`;
export const CLIENT_URL = `/api/v1/businesses`;

export type IWallet = {
  balance: number;
  currency: string;
  accountNumber: string;
  name: string;
  bank: string;
};
