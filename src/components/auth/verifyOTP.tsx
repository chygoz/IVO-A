import React from "react";
import { Card } from "../ui/card";
import Container from "../ui/container";
import { VerifyInputOTP } from "./forms/verifyEmail";

type VerifyOTPProps = {
  code: string;
};
function VerifyOTP({ code }: VerifyOTPProps) {
  return (
    <Container className="px-4 md:px-8 py-8 pt-[126px] min-h-[400px] flex flex-col justify-center">
      <Card className="px-4 md:px-8 md:max-w-lg md:mx-auto py-4 border border-solid rounded-md border-secondary flex flex-col justify-center">
        <h1 className="font-bold  text-xl">Verify your Spotfinda Email</h1>
        <p>Verify your spotfinda email to activate your account.</p>
        <VerifyInputOTP code={code} />
      </Card>
    </Container>
  );
}

export default VerifyOTP;
