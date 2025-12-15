import {
  ApiResponse,
  Transaction,
  TransactionDetail,
  Wallet,
  WalletHistoryEntry,
  TransactionStats,
  WalletStats,
  ChartDataPoint,
  TimeRange,
} from "@/types/account";
import { fetchAPI } from "./config";

const ACCOUNT_BASE_URL = "/api/v1/accounts";

// Transaction APIs
export async function fetchTransactions(
  page: number = 1,
  limit: number = 10,
  filters: Record<string, string> = {}
): Promise<ApiResponse<Transaction[]>> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters,
  });

  return fetchAPI({
    url: `${ACCOUNT_BASE_URL}/transactions?${queryParams.toString()}`,
    method: "GET",
    tags: ["transactions"],
  });
}

export async function fetchTransactionById(
  transactionId: string
): Promise<ApiResponse<TransactionDetail>> {
  return fetchAPI({
    url: `${ACCOUNT_BASE_URL}/transactions/${transactionId}`,
    method: "GET",
    tags: [`transaction-${transactionId}`],
  });
}

export async function fetchTransactionStats(
  timeRange: TimeRange = "30d"
): Promise<
  ApiResponse<{ stats: TransactionStats; chartData: ChartDataPoint[] }>
> {
  return fetchAPI({
    url: `${ACCOUNT_BASE_URL}/transactions/stats?timeRange=${timeRange}`,
    method: "GET",
    tags: [`transaction-stats-${timeRange}`],
  });
}

// Wallet APIs
export async function fetchWalletBalance(
  currency: string = "NGN",
  session?: any // Add session parameter
): Promise<ApiResponse<Wallet>> {
  return fetchAPI({
    url: `${ACCOUNT_BASE_URL}/wallet/balance?currency=${currency}`,
    method: "GET",
    tags: [`wallet-balance-${currency}`],
    session, // Pass session to fetchAPI
  });
}

export async function fetchAllWallets(
  session?: any
): Promise<ApiResponse<Wallet[]>> {
  // Add session parameter
  return fetchAPI({
    url: `${ACCOUNT_BASE_URL}/wallets`,
    method: "GET",
    tags: ["wallets"],
    session, // Pass session to fetchAPI
  });
}

export async function fetchWalletHistory(
  page: number = 1,
  limit: number = 10,
  filters: Record<string, string> = {},
  session?: any // Add session parameter
): Promise<ApiResponse<WalletHistoryEntry[]>> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters,
  });

  return fetchAPI({
    url: `${ACCOUNT_BASE_URL}/wallet/history?${queryParams.toString()}`,
    method: "GET",
    tags: ["wallet-history"],
    session, // Pass session to fetchAPI
  });
}

export async function fetchWalletStats(
  timeRange: TimeRange = "30d",
  currency: string = "NGN",
  session?: any // Add session parameter
): Promise<ApiResponse<{ stats: WalletStats; chartData: ChartDataPoint[] }>> {
  return fetchAPI({
    url: `${ACCOUNT_BASE_URL}/wallet/stats?timeRange=${timeRange}&currency=${currency}`,
    method: "GET",
    tags: [`wallet-stats-${currency}`],
    session, // Pass session to fetchAPI
  });
}

// Export these functions to be used in client components via React's useTransition or server actions
export const transactions = {
  getAll: fetchTransactions,
  getById: fetchTransactionById,
  getStats: fetchTransactionStats,
};

export const wallet = {
  getBalance: fetchWalletBalance,
  getAll: fetchAllWallets,
  getHistory: fetchWalletHistory,
  getStats: fetchWalletStats,
};
