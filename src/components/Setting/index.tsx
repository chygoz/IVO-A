import React from "react";
import PageWrapper from "../ui/pageWrapper";
import PageHeader from "../ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettings from "./general";
import ChangePassword from "./change-password";

type SettingsComponentProps = {
  queryParams: { tabs?: string };
};

function SettingsComponent({ queryParams }: SettingsComponentProps) {
  return (
    <PageWrapper>
      <PageHeader title="Settings" />
      <Tabs defaultValue="general" className="w-full mt-6">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="change-password">Change Password</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>
        <TabsContent value="change-password">
          <ChangePassword />
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
}

export default SettingsComponent;
