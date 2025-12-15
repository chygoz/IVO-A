"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertOctagon } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to your error reporting service
    console.error("Global error caught:", error);

    // In a production app, you'd send this to Sentry, LogRocket, etc.
    // Example: Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="h-screen flex flex-col items-center justify-center p-4">
          <div className="max-w-md text-center">
            <AlertOctagon className="mx-auto h-16 w-16 text-destructive mb-6" />
            <h1 className="text-4xl font-bold mb-2">Oops!</h1>
            <h2 className="text-2xl font-semibold mb-4">
              Something went wrong
            </h2>
            <p className="text-muted-foreground mb-4">
              We&apos;ve encountered an unexpected error and our team has been
              notified.
            </p>
            {error?.digest && (
              <p className="text-xs text-muted-foreground mb-6">
                Error ID: {error.digest}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={reset} variant="default">
                Try Again
              </Button>
              <Button asChild variant="outline">
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
