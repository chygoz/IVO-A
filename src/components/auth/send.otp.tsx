import React from "react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { sendVerification } from "@/actions/send.verification";
import ButtonText from "../ui/buttonText";
import { useRouter } from "next/navigation";

type SendOTPProps = {
  email: string;
};

function SendOTP({ email }: SendOTPProps) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: sendVerification,
    onSuccess(data, variables, context) {
      router.push("/auth/verify/otp");
      sessionStorage.setItem("otp-email", email);
    },
  });

  return (
    <div className="my-8 flex flex-col gap-2">
      <h4 className="font-bold text-left">Your email is not verified</h4>
      <p>Activate your email to gain access to the spotfinda account.</p>
      <Button
        onClick={() => {
          mutation.mutate(email);
        }}
        disabled={mutation.isPending}
        className="w-full"
      >
        <ButtonText loading={mutation.isPending}>
          Send Verification Email
        </ButtonText>
      </Button>
    </div>
  );
}

export default SendOTP;
