export const URL = `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/users`;

export interface IUser {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  username: string;
  email: string;
  emailVerified?: boolean;
  phone?: string;
  userType: string;
  avatar?: string;
  tokens: string[];
  role: string;
}
