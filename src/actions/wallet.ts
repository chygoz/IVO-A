"use server";
import { revalidatePath } from "next/cache";
import { wallet as walletAPI } from "./transactions";
import { TimeRange } from "@/types/account";

// Get wallet balance for specific currency
export async function getWalletBalance(
  currency: string = "NGN",
  path?: string,
  session?: any // Add session parameter
) {
  try {
    const response = await walletAPI.getBalance(currency, session); // Pass session to API

    if (path) {
      revalidatePath(path);
    }

    if (!response.success || !response.data) {
      throw new Error(response.message || "Failed to fetch wallet balance");
    }

    return { wallet: response.data };
  } catch (error) {
    console.error("Error in getWalletBalance:", error);
    return {
      wallet: null,
      error: (error as Error).message,
    };
  }
}

// Get all wallets
export async function getAllWallets(path?: string, session?: any) {
  // Add session parameter
  try {
    const response = await walletAPI.getAll(session); // Pass session to API

    if (path) {
      revalidatePath(path);
    }

    if (!response.success) {
      throw new Error(response.message || "Failed to fetch wallets");
    }

    return { wallets: response.data || [] };
  } catch (error) {
    console.error("Error in getAllWallets:", error);
    return {
      wallets: [],
      error: (error as Error).message,
    };
  }
}

// Get wallet history for specific currency
export async function getWalletHistory(
  page: number = 1,
  limit: number = 10,
  filters: Record<string, string> = {},
  currency: string = "NGN",
  path?: string,
  session?: any // Add session parameter
) {
  try {
    const response = await walletAPI.getHistory(
      page,
      limit,
      {
        ...filters,
        currency,
      },
      session
    ); // Pass session to API

    if (path) {
      revalidatePath(path);
    }

    if (!response.success) {
      throw new Error(response.message || "Failed to fetch wallet history");
    }

    return {
      entries: response.data || [],
      pagination: response.pagination || {
        page,
        limit,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  } catch (error) {
    console.error("Error in getWalletHistory:", error);
    return {
      entries: [],
      pagination: {
        page,
        limit,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
      error: (error as Error).message,
    };
  }
}

// Get wallet stats for specific currency
export async function getWalletStats(
  timeRange: TimeRange = "30d",
  currency: string = "NGN",
  path?: string,
  session?: any // Add session parameter
) {
  try {
    const response = await walletAPI.getStats(timeRange, currency, session); // Pass session to API

    if (path) {
      revalidatePath(path);
    }

    if (!response.success || !response.data) {
      throw new Error(response.message || "Failed to fetch wallet stats");
    }

    return {
      stats: response.data.stats,
      chartData: response.data.chartData,
    };
  } catch (error) {
    console.error("Error in getWalletStats:", error);
    return {
      stats: null,
      chartData: [],
      error: (error as Error).message,
    };
  }
}
