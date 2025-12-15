import "./globals.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import Providers from "@/providers";
import type { Metadata } from "next";
import { ttNorms } from "./font";
import { Toaster } from "@/components/ui/sonner";
import { Toaster as SecondaryToaster } from "@/components/ui/toaster";
import GlobalErrorHandler from "@/components/global-error-handler";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Admin IVO",
  description: "Manage IVO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const SERVER_URL = process.env.SERVER_API_URL;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ttNorms.variable} font-sans`}>
        <Providers serverUrl={SERVER_URL || ""}>
          {children}
        </Providers>
        <SecondaryToaster />
        <Toaster />
        <GlobalErrorHandler />
      </body>
    </html>
  );
}