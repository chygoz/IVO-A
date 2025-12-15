import VerifyOTP from "@/components/auth/verifyOTP";
import React from "react";

type OTPPageProps = {
  searchParams: { code: string };
};

function OTPPage({ searchParams }: OTPPageProps) {
  return <VerifyOTP code={searchParams.code} />;
}

export default OTPPage;
