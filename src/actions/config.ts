import { auth } from "@/auth";
import { getSession } from "next-auth/react";

type FetchAPIProps = {
  form?: boolean;
  url: string;
  method?: string;
  body?: any;
  tags?: string[];
  responseType?: string;
  // Add session parameter
  session?: any;
};

// Helper to detect if we're on the server
const isServer = typeof window === "undefined";

export async function fetchAPI({
  url,
  method = "GET",
  body,
  tags,
  form,
  session: providedSession, // Accept session as parameter
}: FetchAPIProps) {
  try {
    // Use provided session or get current session
    let session = providedSession;
    if (!session) {
      if (isServer) {
        // Server-side: use auth() from NextAuth
        try {
          const { headers } = await import("next/headers");
          session = await auth();
        } catch (error) {
          console.warn("Skipping authentication during prerendering:", error);
        }
      } else {
        // Client-side: use getSession() from next-auth/react
        try {
          session = await getSession();
        } catch (error) {
          console.warn("Failed to get client session:", error);
        }
      }
    }

    // Use NEXT_PUBLIC_SERVER_API_URL for both client and server
    // SERVER_API_URL is server-only and returns undefined on client-side
    const BASE_URL =
      process.env.NEXT_PUBLIC_SERVER_API_URL || process.env.SERVER_API_URL;
    console.log("[fetchAPI] BASE_URL:", BASE_URL);
    console.log("[fetchAPI] REQUEST URL:", url);
    console.log("[fetchAPI] Session:", session);
    console.log(
      "[fetchAPI] Access Token:",
      session?.accessToken ? "Present" : "Missing"
    );
    console.log("[fetchAPI] Current Business:", session?.current_business);
    const FULL_PATH = `${BASE_URL}${url}`;

    // Add the token to the headers
    const headers: HeadersInit = {
      ...(!form ? { "Content-Type": "application/json" } : {}),
      ...(session?.accessToken
        ? { Authorization: `Bearer ${session.accessToken}` }
        : {}),
      ...(session?.current_business
        ? { "x-admin-key": session.current_business.identifier }
        : {}),
    };
    console.log("[fetchAPI] Headers being sent:", headers);

    const options: RequestInit = {
      method,
      headers,
      ...(tags?.length ? { next: { tags } } : {}),
      cache: "no-store",
    };

    // If there's a body, add it to the request
    if (body) {
      options.body = form ? body : JSON.stringify(body);
    }

    // Fetch the API
    const response = await fetch(FULL_PATH, options);

    // Handle response errors or return the response
    if (!response.ok) {
      const resError = await response.json();
      console.log(resError);
      throw new Error(
        `${resError?.message || `${resError?.error}` || "something went wrong"}`
      );
    }

    return await response.json();
  } catch (error) {
    return {
      error: true,
      message: "An unexpected error occurred",
      details:
        typeof error === "string"
          ? error
          : // @ts-expect-error fix
            error?.message || "something is wrong", // Be cautious with exposing details
    };
  }
}
