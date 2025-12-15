import { IUser, URL } from "./util";
import { fetchAPI } from "../config";

export const updateMe = async (formData: {
  firstName: string;
  lastName: string;
  phone: string;
  username: string;
  avatar?: string;
  publicId?: string;
}): Promise<{ data: IUser }> => {
  const res = await fetchAPI({
    method: "PUT",
    url: `${URL}/me`,
    body: formData,
  });

  return res;
};

export const getUsers = async (): Promise<{
  data: {
    results: IUser[];
  };
}> => {
  const res = await fetchAPI({ url: `${URL}/clients` });
  return res;
};

import { PasswordChangeRequest, PasswordChangeResponse } from "@/types/user";

/**
 * User API Service
 * Handles user account-related API requests
 */
class UserService {
  private apiUrl: string = "/api/v1/auth";

  /**
   * Change user password
   */
  async changePassword(
    data: PasswordChangeRequest
  ): Promise<PasswordChangeResponse> {
    try {
      const response = await fetchAPI({
        method: "PUT",
        url: `${this.apiUrl}/password`,
        body: data,
      });

      const result = response;

      if (response.error) {
        throw new Error(
          response.details || `Error ${response.status}: ${response.statusText}`
        );
      }

      return result;
    } catch (error: any) {
      console.error("Error changing password:", error);
      throw error;
    }
  }
}

// Export as singleton
export const userService = new UserService();
