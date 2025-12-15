import { auth } from "@/auth";

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
      // Check if we're in a prerendering context by trying to access headers
      try {
        // Try to access headers to detect if we're in a prerendering context
        const { headers } = await import("next/headers");
        // If we can access headers, we're not in a prerendering context
        session = await auth();
      } catch (error) {
        // If we can't access headers or auth fails, we might be in a prerendering context
        console.warn("Skipping authentication during prerendering:", error);
      }
    }

    const BASE_URL = process.env.SERVER_API_URL;
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
