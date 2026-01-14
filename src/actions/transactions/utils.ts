export const SERVER_URL = `${process.env.SERVER_API_URL}/api/v1/transactions`;
export const CLIENT_URL = `/api/v1/transactions`;
export const getURL = () => `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/transactions`;

export type Transaction = {
  referenceId: string;
  user: {
    name: string;
    email: string;
  };
  bookingCode: string;
  amount: string;
  transactionType: string;
  status: string;
  partner: {
    name: string;
  };
  createdAt: Date;
};
