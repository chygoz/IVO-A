import { getResellers } from "@/actions/resellers";
import StoreDirectory from "@/components/resellers/store-directory";
import PageWrapper from "@/components/ui/pageWrapper";
import { validatePageParam } from "@/lib/utils";
import React from "react";

type StoreDirectoryPageProps = {
  searchParams: { p: string };
};

async function StoreDirectoryPage({ searchParams }: StoreDirectoryPageProps) {
  const response = await getResellers({ p: validatePageParam(searchParams.p) });

  return (
    <PageWrapper>
      <StoreDirectory
        resellers={response?.data?.results || []}
        metadata={response.data.metadata}
      />
    </PageWrapper>
  );
}

export default StoreDirectoryPage;
