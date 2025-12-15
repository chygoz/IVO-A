"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Wallet } from "@/types/account";

interface RequestPayoutProps {
  currency?: string;
  wallet?: Wallet | null;
}

const formSchema = z.object({
  amount: z.string().min(1, { message: "Amount is required" }),
  accountId: z.string().min(1, { message: "Select a withdrawal account" }),
});

export const RequestPayout: React.FC<RequestPayoutProps> = ({
  currency = "NGN",
  wallet,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock accounts based on currency
  const withdrawalAccounts = {
    NGN: [
      { id: "1", name: "GTBank - 0123456789", bank: "GTBank" },
      { id: "2", name: "Access Bank - 9876543210", bank: "Access Bank" },
    ],
    USD: [
      { id: "3", name: "Chase - USD12345678", bank: "Chase Bank" },
      { id: "4", name: "Citi - USD98765432", bank: "Citibank" },
    ],
  };

  const accounts =
    withdrawalAccounts[currency as keyof typeof withdrawalAccounts] || [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      accountId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Here you would make your API call to initiate withdrawal
      console.log("Initiating withdrawal:", {
        ...values,
        currency,
      });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error initiating withdrawal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Withdraw Funds</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>
            Enter amount and select an account to withdraw to.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount ({currency})</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`Enter amount in ${currency}`}
                      {...field}
                      type="number"
                      min="1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Withdrawal Account</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an account" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accounts.length > 0 ? (
                        accounts.map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No accounts found
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Withdraw"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
