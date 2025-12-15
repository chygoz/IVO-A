"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import React, { useEffect, useState } from "react";
import { notFound, usePathname } from "next/navigation";
import { doCredentialLogin } from "@/actions/login";
import { toast } from "sonner";
import ButtonText from "@/components/ui/buttonText";
import ErrorAlert from "@/components/ui/error-alert";
import { useMutation } from "@tanstack/react-query";
import { sendVerification } from "@/actions/send.verification";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

type VerifyInputOTPProps = {
  code: string;
};
export function VerifyInputOTP({ code }: VerifyInputOTPProps) {
  const mutation = useMutation({ mutationFn: sendVerification });
  const [error, setError] = React.useState("");
  const [timer, setTimer] = useState(0);
  const pathname = usePathname();
  const defaultRedirect =
    pathname === "/auth/verify/otp" ? "/dashboard" : pathname;
  const [isLoading, setIsLoading] = React.useState(false);
  const TIMER_DURATION = 60; // 1 minute
  const [email, setEmail] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: code || "",
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const e = sessionStorage.getItem("otp-email");
      if (e) {
        setEmail(e);
      } else {
        notFound();
      }
    }
  }, []);

  useEffect(() => {
    // Check if running in the browser before accessing sessionStorage
    if (typeof window !== "undefined") {
      const storedEndTime = sessionStorage.getItem("otpTimerEndTime");
      if (storedEndTime) {
        const endTime = new Date(storedEndTime);
        const remainingTime = Math.floor(
          (endTime.getTime() - new Date().getTime()) / 1000
        );
        if (remainingTime > 0) {
          setTimer(remainingTime);
        }
      }
    }

    // Decrement timer every second if it's greater than 0
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(interval); // Clear interval when timer reaches 0
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("otpTimerEndTime");
        }
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [timer]);

  const handleResend = () => {
    setTimer(TIMER_DURATION);
    if (typeof window !== "undefined") {
      const endTime = new Date(new Date().getTime() + TIMER_DURATION * 1000);
      mutation.mutate(email);
      toast.success("opt sent to your email");
      sessionStorage.setItem("otpTimerEndTime", endTime.toISOString());
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("code", data.pin);
    setIsLoading(true);
    const result = await doCredentialLogin(
      formData,
      defaultRedirect,
      "verifyEmail"
    );
    if (result?.error) {
      setError(result?.error || "Something went wrong");
    } else {
      toast.success("Email verified successfully");
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center space-y-6 mt-8"
      >
        {error ? <ErrorAlert>{error}</ErrorAlert> : null}
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel className="hidden">One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup className="">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your email &apos;
                <span className="font-bold">{email}&apos;</span>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-1 text-xs w-full">
          <p>Did not get otp?</p>
          {timer === 0 ? (
            <button
              type="button"
              onClick={handleResend}
              className="text-secondary font-bold"
            >
              Resend
            </button>
          ) : (
            <div>{timer}s</div>
          )}
        </div>

        <Button disabled={isLoading} className="w-full" type="submit">
          <ButtonText loading={isLoading}>Verify OTP</ButtonText>
        </Button>
      </form>
    </Form>
  );
}
