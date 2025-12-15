import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, Tag, CreditCard } from "lucide-react";
import { getTransactionById } from "@/actions/transactions-server";
import { formatCurrency } from "@/lib/utils-alt";
import { formatDateTime } from "@/lib/utils";
import SwitchMenu from "@/components/accounts/switch-menu";
import Status from "@/components/accounts/status";

export const metadata: Metadata = {
  title: "Transaction Details | Dashboard",
  description: "View detailed information about a transaction",
};

interface PageProps {
  params: {
    id: string;
  };
  searchParams: {
    currency?: string;
  };
}

async function TransactionDetailPage({ params, searchParams }: PageProps) {
  const currency = searchParams.currency || "NGN";
  const { transaction, error } = await getTransactionById(params.id);

  if (error || !transaction) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link href={`/dashboard/transactions?currency=${currency}`}>
            <Button variant="outline" size="icon" className="mr-4">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Transaction Details</h1>
        </div>
        <SwitchMenu currency={currency} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                {currency} Transaction Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Transaction ID
                  </dt>
                  <dd className="mt-1 text-sm font-semibold">
                    {transaction.transactionId}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Reference ID
                  </dt>
                  <dd className="mt-1 text-sm font-semibold">
                    {transaction.referenceId}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Amount</dt>
                  <dd className="mt-1 text-base font-bold">
                    {formatCurrency(transaction.amount, currency)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <Status
                      variant={
                        transaction.status === "completed"
                          ? "success"
                          : transaction.status === "pending"
                          ? "warning"
                          : transaction.status === "failed"
                          ? "error"
                          : "default"
                      }
                      text={transaction.status}
                      size="md"
                    />
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="mt-1">
                    <Status
                      variant={
                        transaction.transactionType === "credit"
                          ? "success"
                          : "warning"
                      }
                      text={transaction.transactionType}
                      size="md"
                    />
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Date & Time
                  </dt>
                  <dd className="mt-1 text-sm font-semibold">
                    {formatDateTime(transaction.createdAt)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Source Type
                  </dt>
                  <dd className="mt-1 text-sm font-semibold capitalize">
                    {transaction.sourceType}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Destination
                  </dt>
                  <dd className="mt-1 text-sm font-semibold">
                    {transaction.destination}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Currency
                  </dt>
                  <dd className="mt-1 text-sm font-semibold">
                    {transaction.currency}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {transaction.ledgerEntries &&
            transaction.ledgerEntries.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Ledger Entries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transaction.ledgerEntries.map((entry) => (
                      <div key={entry.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div
                              className={`rounded-full p-2 mr-3 ${
                                entry.entryType === "credit"
                                  ? "bg-green-100"
                                  : "bg-amber-100"
                              }`}
                            >
                              <CreditCard
                                size={16}
                                className={
                                  entry.entryType === "credit"
                                    ? "text-green-600"
                                    : "text-amber-600"
                                }
                              />
                            </div>
                            <div>
                              <p className="font-medium capitalize">
                                {entry.entryType} Entry
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatDateTime(entry.createdAt)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p
                              className={`font-bold text-base ${
                                entry.entryType === "credit"
                                  ? "text-green-600"
                                  : "text-amber-600"
                              }`}
                            >
                              {entry.entryType === "credit" ? "+" : "-"}
                              {formatCurrency(entry.amount, currency)}
                            </p>
                            <p className="text-sm text-gray-500">
                              Balance: {formatCurrency(entry.balance, currency)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex">
                  <div className="mr-3 flex flex-col items-center">
                    <div className="rounded-full bg-green-100 p-2">
                      <Clock size={14} className="text-green-600" />
                    </div>
                    <div className="h-full w-px bg-gray-200 mt-2"></div>
                  </div>
                  <div>
                    <p className="font-medium">Transaction Created</p>
                    <p className="text-sm text-gray-500">
                      {formatDateTime(transaction.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-3 flex flex-col items-center">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Tag size={14} className="text-blue-600" />
                    </div>
                    <div className="h-full w-px bg-gray-200 mt-2"></div>
                  </div>
                  <div>
                    <p className="font-medium">Status Updated</p>
                    <p className="text-sm text-gray-500">
                      Status set to{" "}
                      <span className="font-semibold capitalize">
                        {transaction.status}
                      </span>
                    </p>
                  </div>
                </div>

                {transaction.ledgerEntries &&
                  transaction.ledgerEntries.length > 0 && (
                    <div className="flex">
                      <div className="mr-3 flex flex-col items-center">
                        <div className="rounded-full bg-purple-100 p-2">
                          <CreditCard size={14} className="text-purple-600" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Ledger Updated</p>
                        <p className="text-sm text-gray-500">
                          {transaction.ledgerEntries.length} ledger{" "}
                          {transaction.ledgerEntries.length === 1
                            ? "entry"
                            : "entries"}{" "}
                          created
                        </p>
                      </div>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>

          {/* {transaction.metadata &&
            Object.keys(transaction.metadata).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Metadata</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    {Object.entries(transaction.metadata).map(
                      ([key, value]) => (
                        <div key={key}>
                          <dt className="text-sm font-medium text-gray-500 capitalize">
                            {key.replace(/_/g, " ")}
                          </dt>
                          <dd className="mt-1 text-sm font-semibold">
                            {typeof value === "object"
                              ? JSON.stringify(value)
                              : String(value)}
                          </dd>
                        </div>
                      )
                    )}
                  </dl>
                </CardContent>
              </Card>
            )} */}
        </div>
      </div>
    </div>
  );
}

export default TransactionDetailPage;
