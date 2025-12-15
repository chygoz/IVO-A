// Types for Transaction and Wallet data

export interface Transaction {
  id: string;
  transactionId: string;
  referenceId: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "reversed";
  transactionType: string;
  sourceType: string;
  createdAt: string;
  destination: string;
  metadata?: Record<string, any>;
}

export interface TransactionDetail extends Transaction {
  ledgerEntries: LedgerEntry[];
}

export interface LedgerEntry {
  id: string;
  amount: number;
  entryType: "credit" | "debit";
  balance: number;
  createdAt: string;
}

export interface Wallet {
  id: string;
  availableBalance: number;
  pendingBalance: number;
  totalBalance: number;
  currency: string;
  isActive: boolean;
  updatedAt: string;
}

export interface WalletHistoryEntry {
  id: string;
  amount: number;
  currency: string;
  entryType: "credit" | "debit";
  balance: number;
  createdAt: string;
  transaction: {
    id: string;
    transactionId: string;
    reference: string;
    status: string;
    transactionType: string;
  } | null;
}

export interface ChartDataPoint {
  date: string;
  credit?: number;
  debit?: number;
  balance?: number;
  inflow?: number;
  outflow?: number;
}

export interface TransactionStats {
  totalTransactions: number;
  totalAmount: number;
  creditAmount: number;
  debitAmount: number;
  creditCount: number;
  debitCount: number;
}

export interface WalletStats {
  currentBalance: number;
  pendingBalance: number;
  totalBalance: number;
  currency: string;
  totalInflow: number;
  totalOutflow: number;
  inflowCount: number;
  outflowCount: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  pagination?: PaginationInfo;
  message?: string;
  error?: string;
}

export interface TimeRangeOption {
  value: string;
  label: string;
}

export type TimeRange = "7d" | "30d" | "90d";
