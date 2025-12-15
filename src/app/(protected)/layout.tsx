"use client";

import { useSession } from "next-auth/react";
import { SigninForm } from "@/components/auth";
import Container from "@/components/ui/container";
import PublicLayout from "../(public)/layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();

  // Show loading state while checking auth
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // If no session, show signin form
  if (!session) {
    return (
      <PublicLayout>
        <Container className="px-4 md:px-8 ">
          <div className="py-8 min-h-[calc(100vh)] pt-[150px] flex flex-col justify-center">
            <div className="px-4 md:px-8 md:max-w-lg md:mx-auto py-4 border border-solid rounded-md border-background-light flex flex-col justify-center">
              <SigninForm />
            </div>
          </div>
        </Container>
      </PublicLayout>
    );
  }

  return <>{children}</>;
}