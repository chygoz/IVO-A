"use client";
import { inititateDeleteAccount } from "@/actions/accounts";
import { Account } from "@/actions/accounts/utils";
import { Button } from "@/components/ui/button";
import ButtonText from "@/components/ui/buttonText";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type NewVenueModalProps = {
  account: Account;
};
export function RemoveWithdrawalAccount({ account }: NewVenueModalProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: inititateDeleteAccount,
    onSuccess(data) {
      router.replace(
        `/dashboard/accounts/withdraw-accounts/verify-otp?requestId=${data.requestId}&accountId=${account._id}`
      );
      toast.success("successfully requested add account");
    },
  });

  function handleClick() {
    mutation.mutate(account._id);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Delete account">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80vw] flex flex-col justify-center items-center sm:max-w-[500px] md:min-h-[400px] text-black">
        <h4 className="font-bold text-xl text-center">
          Are you sure you want to remove this account?
        </h4>
        <div className=" text-center">
          You are about to remove this withdrawal account{" "}
          <p>
            <div className="flex-1">
              <p className="text-sm text-gray-500">
                {account.bankName} - {account.accountNumber}
              </p>
            </div>
          </p>
        </div>
        <div>
          <Button
            className="bg-red-500"
            disabled={mutation.isPending}
            onClick={handleClick}
          >
            <ButtonText loading={mutation.isPending}>Yes, Continue</ButtonText>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
