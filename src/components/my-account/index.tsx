"use client";
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import BasicInformationForm from "@/components/my-account/basic-infomation-form";
import ChangePasswordForm from "@/components/my-account/change-password-form";
import NotificationSettings from "@/components/my-account/notification-settings";
import DeleteAccountSection from "@/components/my-account/delete-account";
import AccountSidebar from "@/components/my-account/account-siderbar";
import AccountHeader from "@/components/my-account/account-header";
import { UserProfile } from "./types";
import { User } from "next-auth";

export default function AccountComponent({ userData }: { userData: User }) {
  const [activeTab, setActiveTab] = useState("basic-information");
  const [user, setUser] = useState<UserProfile>({
    firstName: userData.name?.split(" ")[0] || "Che",
    lastName: userData.name?.split(" ")[1] || "Simmons",
    email: userData.email || "brooklynsimmons@gmail.com",
    phoneNumber: "08100000000",
    homeAddress: "",
    avatarUrl: "",
  });

  const handleUpdateProfile = async (updatedProfile: UserProfile) => {
    setUser({
      ...user,
      ...updatedProfile,
    });

    // In a real app, this would make an API call to update the profile
    console.log("Profile updated:", updatedProfile);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <AccountSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="md:col-span-3">
          <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
            <AccountHeader user={user} />
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsContent value="profile" className="mt-0">
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">
                  Basic Information
                </h2>
                <BasicInformationForm
                  user={user}
                  onSubmit={handleUpdateProfile}
                />
              </div>
            </TabsContent>

            <TabsContent value="password" className="mt-0">
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Change Password</h2>
                <ChangePasswordForm />
              </div>
            </TabsContent>

            <TabsContent value="notification" className="mt-0">
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Notification</h2>
                <NotificationSettings />
              </div>
            </TabsContent>

            <TabsContent value="delete-account" className="mt-0">
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">
                  Delete your Account
                </h2>
                <DeleteAccountSection />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
