import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";

export async function registerUser(credentials: {
  email: string;
  phone?: string;
  password: string;
  fullName: string;
  partnerKey?: string;
  type: "partner" | "user";
}) {
  const defaultAuthPath = "/api/v1/auth/register";

  try {
    const apires = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}${defaultAuthPath}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    if (!apires.ok) {
      const errorApi = await apires.json();
      throw new Error(errorApi?.message);
    }
    const apiResponse = await apires.json();

    if (!apiResponse?.token) {
      // No user found, so this is their first attempt to login
      // meaning this is also the place you could do registration
      throw new Error(apiResponse.message || "error signing in");
    }

    const user = {
      email: apiResponse?.data.email,
      firstName: apiResponse?.data.firstName,
      lastName: apiResponse?.data.lastName,
      type: apiResponse?.data.type,
      token: apiResponse?.data.token,
    };
    return user;
  } catch (error: any) {
    return { error: error.message || "An unknown error occurred" };
  }
}
