"use client";

import { sendResellersWelcomeMail } from "@/actions/mail";
import { revalidatePage } from "@/actions/revalidate.tag";
import ButtonText from "@/components/ui/buttonText";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function ResellerLoginBadge({ count }: { count: number }) {
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();
  const mutation = useMutation({
    mutationFn: sendResellersWelcomeMail,
    onSuccess: () => {
      revalidatePage(pathname);
      toast.success("Login credentials have been sent to the resellers.");
      if (dismissed) return;
      setDismissed(true);
    },
  });

  if (dismissed) return null;

  return (
    <div className="fixed z-40 bottom-4 right-4 max-w-sm bg-blue-50 border border-blue-300 rounded-lg shadow-lg p-4 flex items-start gap-3">
      <div className="bg-blue-100 p-2 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-primary">
            Pending Reseller Accounts
          </h3>
          <button
            onClick={() => setDismissed(true)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Dismiss notification"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <p className="text-sm text-primary mt-1">
          {count} reseller{count !== 1 ? "s" : ""} need{count === 1 ? "s" : ""}{" "}
          login credentials.
        </p>

        <div className="mt-3">
          <button
            disabled={mutation.isPending}
            className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            onClick={() => {
              mutation.mutate();
              setDismissed(true);
            }}
          >
            <ButtonText loading={mutation.isPending}>
              Send Login Details
            </ButtonText>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResellerLoginBadge;
