import { getBlank } from "@/actions/blanks";
import BlankPreviewComponent from "@/components/blanks/blank-preview-component";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function BlankPreviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const blankResponse = await getBlank(params.slug);

  if (!blankResponse?.data) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold">Blank not found</h1>
        <p className="mt-2">
          The blank you&apos;re looking for doesn&apos;t exist or you
          don&apos;t have permission to view it.
        </p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/resellers/blanks">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blanks
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
              <Link href={`/dashboard/resellers/blanks/${params.slug}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="text-sm font-medium">Preview Mode</div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
              {blankResponse.data.status}
            </div>

            <Button asChild size="sm" variant="outline">
              <Link href={`/dashboard/resellers/blanks/${params.slug}/edit`}>
                Edit Blank
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <BlankPreviewComponent blank={blankResponse.data} />
      </div>
    </div>
  );
}