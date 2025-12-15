"use client";
import React, { useState } from "react";
import { RequestPayout } from "../withdraw";
import CopyText from "@/components/ui/copyText";
import { IWallet } from "@/actions/business/utils";
import { formatToNaira } from "@/lib/utils";

type WalletProps = {
  wallet: IWallet | null;
};

function Wallet({ wallet }: WalletProps) {
  const [show, setShow] = useState(false);
  const balance = wallet ? wallet.balance : 0;
  return (
    <div className="min-h-20 md:min-h-40 rounded-md">
      <div className="h-[156px] bg-primary-50 rounded-xl p-6">
        <div className="font-medium flex items-center gap-2">
          Wallet Balance{" "}
          <button
            onClick={() => setShow((prev) => !prev)}
            className="flex items-center"
          >
            {show ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            )}
          </button>
        </div>
        <p className="text-xl mt-2 md:text-4xl font-bold">
          {show ? formatToNaira(`${balance}`) : "***********"}
        </p>
      </div>
      {wallet ? (
        <div className="flex items-end gap-8">
          <div className="text-xs mt-4 flex flex-col gap-2">
            <p className="font-bold ">Wallet Payment Account</p>
            <div className="flex items-center gap-4">
              <p className="font-bold text-xl">0943115112</p>
              <CopyText text="0943115112" />
            </div>
            <p className="font-normal ">PAYSTACK-TITAN</p>
          </div>
          <div>
            <div className="">
              <RequestPayout />
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Wallet;
