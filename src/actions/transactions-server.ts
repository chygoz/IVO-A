"use server";

import { revalidatePath } from "next/cache";
import {
  transactions as transactionsAPI,
  wallet as walletAPI,
} from "./transactions";
import { TransactionDetail, TimeRange } from "@/types/account";

// Transaction actions
export async function getTransactions(
  page: number = 1,
  limit: number = 10,
  filters: Record<string, string> = {},
  path?: string,
  session?: any // Add session parameter
) {
  try {
    const response = await transactionsAPI.getAll(page, limit, filters);

    if (path) {
      revalidatePath(path);
    }

    if (!response.success) {
      throw new Error(response.message || "Failed to fetch transactions");
    }

    return {
      transactions: response.data || [],
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
    console.error("Error in getTransactions:", error);
    return {
      transactions: [],
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

export async function getTransactionById(
  transactionId: string,
  path?: string,
  session?: any // Add session parameter
): Promise<{ transaction?: TransactionDetail; error?: string }> {
  try {
    const response = await transactionsAPI.getById(transactionId);

    if (path) {
      revalidatePath(path);
    }

    if (!response.success || !response.data) {
      throw new Error(
        response.message || "Failed to fetch transaction details"
      );
    }

    return { transaction: response.data };
  } catch (error) {
    console.error("Error in getTransactionById:", error);
    return { error: (error as Error).message };
  }
}

export async function getTransactionStats(
  timeRange: TimeRange = "30d",
  path?: string,
  session?: any // Add session parameter
) {
  try {
    const response = await transactionsAPI.getStats(timeRange);

    if (path) {
      revalidatePath(path);
    }

    if (!response.success || !response.data) {
      throw new Error(response.message || "Failed to fetch transaction stats");
    }

    return {
      stats: response.data.stats,
      chartData: response.data.chartData,
    };
  } catch (error) {
    console.error("Error in getTransactionStats:", error);
    return {
      stats: null,
      chartData: [],
      error: (error as Error).message,
    };
  }
}

// Wallet actions
export async function getWalletBalance(path?: string, session?: any) {
  // Add session parameter
  try {
    const response = await walletAPI.getBalance("NGN", session); // Pass session to API

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

export async function getWalletHistory(
  page: number = 1,
  limit: number = 10,
  filters: Record<string, string> = {},
  path?: string,
  session?: any // Add session parameter
) {
  try {
    const response = await walletAPI.getHistory(page, limit, filters, session); // Pass session to API

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

export async function getWalletStats(
  timeRange: TimeRange = "30d",
  path?: string,
  session?: any // Add session parameter
) {
  try {
    const response = await walletAPI.getStats(timeRange, "NGN", session); // Pass session to API

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
