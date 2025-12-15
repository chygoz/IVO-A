import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";

export async function resetPasswordAction(credentials: {
  password: string;
  confirmPassword: string;
  token: string;
}) {
  const defaultAuthPath = "/api/v1/auth/password/reset";

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
    const apiResponse = await apires.json();

    if (apiResponse?.status === "fail") {
      throw new Error(apiResponse.message || "something went wrong");
    }

    return;
  } catch (error: any) {
    return { error: error.message || "An unknown error occurred" };
  }
}
