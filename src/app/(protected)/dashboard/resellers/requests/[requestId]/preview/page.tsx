
import { getSubmission } from "@/actions/submissions";
import RequestPreviewComponent from "@/components/resellers/requests/request-preview-component";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function RequestPreviewPage({
  params,
}: {
  params: { requestId: string };
}) {
  const submissionResponse = await getSubmission(params.requestId);
  if (!submissionResponse.data) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold">Request not found</h1>
        <p className="mt-2">
          The request you&apos;re looking for doesn&apos;t exist or you
          don&apos;t have permission to view it.
        </p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/resellers/requests">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Requests
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              asChild
              className="h-8 w-8 rounded-full"
            >
              <Link href={`/dashboard/resellers/requests/${params.requestId}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="text-sm font-medium">Preview Mode</div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
              {submissionResponse.data.status}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <RequestPreviewComponent request={submissionResponse.data} />
      </div>
    </div>
  );
}
