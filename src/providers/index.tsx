import React from "react";
import QueryProvider from "./tansack.provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import AuthProvider from "./auth-provider";
import { NotificationProvider } from "./notification-provider";
import { ToastProvider } from "@/lib/toast";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  children: React.ReactNode;
  serverUrl: string;
}

function Providers({ children, serverUrl }: ProvidersProps) {
  return (
    <SessionProvider>
      <QueryProvider>
        <AuthProvider>
          <NotificationProvider apiUrl={serverUrl}>
            <ToastProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </ToastProvider>
          </NotificationProvider>
        </AuthProvider>
      </QueryProvider>
    </SessionProvider>
  );
}

export default Providers;