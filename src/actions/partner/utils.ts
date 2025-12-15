export const SERVER_URL = `${process.env.SERVER_API_URL}/api/v1/partners`;
export const CLIENT_URL = `/api/v1/partners`;

export type IWallet = {
  balance: number;
  currency: string;
  accountNumber: string;
  name: string;
  bank: string;
};

export type KYB = {
  cac: string;
  directorFirstName: string;
  directorLastName: string;
  directorNin: string;
  documentUrl: string;
  documentType: string;
};
