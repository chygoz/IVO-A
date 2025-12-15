"use client";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "sonner";

type CopyTextProps = {
  text: string;
};
function CopyText({ text }: CopyTextProps) {
  return (
    <CopyToClipboard
      text={text}
      onCopy={() => {
        toast.success("Copied to clipboard");
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        className="cursor-pointer shrink-0"
      >
        <g clipPath="url(#clip0_7629_11894)">
          <path
            d="M13.3333 6.5H7.33333C6.59695 6.5 6 7.09695 6 7.83333V13.8333C6 14.5697 6.59695 15.1667 7.33333 15.1667H13.3333C14.0697 15.1667 14.6667 14.5697 14.6667 13.8333V7.83333C14.6667 7.09695 14.0697 6.5 13.3333 6.5Z"
            stroke="#556376"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.33398 10.5H2.66732C2.3137 10.5 1.97456 10.3595 1.72451 10.1095C1.47446 9.85942 1.33398 9.52028 1.33398 9.16666V3.16666C1.33398 2.81304 1.47446 2.4739 1.72451 2.22385C1.97456 1.9738 2.3137 1.83333 2.66732 1.83333H8.66732C9.02094 1.83333 9.36008 1.9738 9.61013 2.22385C9.86018 2.4739 10.0007 2.81304 10.0007 3.16666V3.83333"
            stroke="#556376"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_7629_11894">
            <rect
              width="16"
              height="16"
              fill="white"
              transform="translate(0 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </CopyToClipboard>
  );
}

export default CopyText;
