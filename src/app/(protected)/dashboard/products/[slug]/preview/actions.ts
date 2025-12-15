"use server";

import { auth } from "@/auth";
import { fetchAPI } from "@/actions/config";

const PRODUCT_BASE_URL = "/api/v1/products";

export async function fetchProduct(slug: string) {
  try {
    // Try to get the current session with the token
    let session;
    try {
      // Try to access headers to detect if we're in a prerendering context
      const { headers } = await import('next/headers');
      // If we can access headers, we're not in a prerendering context
      session = await auth();
    } catch (error) {
      // If we can't access headers or auth fails, we might be in a prerendering context
      console.warn("Skipping authentication during prerendering:", error);
      // Return early with a mock response for prerendering
      return {
        success: false,
        error: "Prerendering context - no session available",
      };
    }

    // If we don't have a session, return early
    if (!session) {
      return {
        success: false,
        error: "No session available",
      };
    }

    const res = await fetchAPI({
      url: `${PRODUCT_BASE_URL}/${slug}`,
      session, // Pass session to fetchAPI
    });

    if (res?.error) {
      return {
        success: false,
        error: "Product not found",
      };
    }

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      success: false,
      error: "Failed to load product",
    };
  }
}