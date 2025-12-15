"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React from "react";
import ButtonText from "@/components/ui/buttonText";
import ErrorAlert from "@/components/ui/error-alert";
import { useMutation } from "@tanstack/react-query";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

import PageWrapper from "@/components/ui/pageWrapper";
import {
  verifyOtpAddAccount,
  verifyOtpDeleteAccount,
} from "@/actions/accounts";
import GoBackButton from "@/components/goBackButton";
import { useRouter, useSearchParams } from "next/navigation";

function OTPComponent() {
  const search = useSearchParams();
  const requestId = search.get("requestId");
  const accountId = search.get("accountId");
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: accountId ? verifyOtpDeleteAccount : verifyOtpAddAccount,
    onSuccess() {
      router.replace("/dashboard/accounts/withdraw-accounts");
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (requestId && data.pin && !accountId) {
      mutation.mutate({
        payload: {
          requestId,
          otp: data.pin,
        },
      });
    }

    if (requestId && data.pin && accountId) {
      mutation.mutate({
        accountId,
        payload: {
          requestId,
          otp: data.pin,
        },
      });
    }
  }

  return (
    <PageWrapper>
      <div className="flex flex-col justify-center max-w-[400px] mx-auto h-full relative min-h-[80vh]">
        <GoBackButton className="mb-5 bg-gray-100 text-black flex items-center gap-2 w-fit">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 8H2.5M2.5 8L7 3.5M2.5 8L7 12.5"
              stroke="#5E718D"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </GoBackButton>
        <h2 className="text-xl font-semibold">Verify OTP Code</h2>
        <p className="text-[#A5A5A5] mb-4">
          Enter the code sent to your email address
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col space-y-6 mt-8"
          >
            {mutation.isError ? (
              <ErrorAlert>{mutation.error.message}</ErrorAlert>
            ) : null}
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="hidden">One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="flex gap-2 ">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={mutation.isPending}
              className="w-full"
              type="submit"
            >
              <ButtonText loading={mutation.isPending}>Verify OTP</ButtonText>
            </Button>
          </form>
        </Form>
      </div>
    </PageWrapper>
  );
}

export default OTPComponent;
