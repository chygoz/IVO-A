"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
// Removed redirect error import for Next.js 16 compatibility

export async function doLogout(pathname: string) {
  await signOut({ redirectTo: pathname || "/" });
}

export async function doCredentialLogin(
  formData: any,
  redirect: string,
  type?: "create" | "login" | "verifyEmail"
) {
  const pK = formData.get("partnerKey");
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      ...(pK ? { partnerKey: pK } : {}),
      ...(type && type === "verifyEmail"
        ? {
            code: formData.get("code"),
          }
        : {}),
      ...(type && type === "create"
        ? {
            fullName: formData.get("fullName"),
            phone: formData.get("phone"),
            type: formData.get("type"),
          }
        : {}),
      redirectTo: redirect,
    });
  } catch (error) {
    // Simplified error handling for Next.js 16
    if (error && typeof error === "object" && "digest" in error) {
      // This is likely a redirect error in Next.js 16
      throw error;
    }
    if (error instanceof Error) {
      //@ts-expect-error fix
      if (error?.cause?.err instanceof Error) {
        return {
          //@ts-expect-error fix
          error: error.cause?.err.message,
        };
      }
      return {
        error: error.message,
      };
    }

    if (error instanceof AuthError) {
      if (error.cause?.err instanceof Error) {
        return {
          error: error?.cause?.err?.message,
        };
      }
    }
    return {
      error: "something went wrong",
    };
  }
}
