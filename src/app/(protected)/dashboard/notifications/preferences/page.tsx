"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  ShoppingBag,
  Tag,
  Truck,
  Bookmark,
  Gift,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from "@/actions/notification";
interface NotificationChannel {
  email: boolean;
  push: boolean;
  sms: boolean;
  inApp: boolean;
}

interface NotificationPreferences {
  transaction: NotificationChannel;
  booking: NotificationChannel;
  system: NotificationChannel;
  organisation: NotificationChannel;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  inAppNotifications: boolean;
  doNotDisturbEnabled: boolean;
  doNotDisturbFrom: string;
  doNotDisturbTo: string;
  doNotDisturbTimezone: string;
}

// Interface for UI display preferences
interface UIPreference {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  email: boolean;
  push: boolean;
  sms: boolean;
}

// Map API categories to UI preferences
const preferenceMap = {
  transaction: {
    id: "transaction",
    title: "Order Updates",
    description:
      "Receive notifications about your order status and transaction updates",
    icon: <ShoppingBag className="h-5 w-5 text-[#20483f]" />,
  },
  booking: {
    id: "booking",
    title: "Delivery Notifications",
    description:
      "Get notified when your order is out for delivery or delivered",
    icon: <Truck className="h-5 w-5 text-[#20483f]" />,
  },
  system: {
    id: "system",
    title: "System Notifications",
    description: "Important updates about your account and system changes",
    icon: <Bell className="h-5 w-5 text-[#20483f]" />,
  },
  organisation: {
    id: "organisation",
    title: "Promotions & Offers",
    description: "Stay updated with exclusive sales, discounts, and offers",
    icon: <Tag className="h-5 w-5 text-[#20483f]" />,
  },
};

export default function NotificationPreferencesPage() {
  const [preferences, setPreferences] = useState<UIPreference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        setIsLoading(true);
        const response = await getNotificationPreferences();

        if (response.success && response.data?.preferences) {
          const apiPrefs = response.data.preferences;

          // Transform API preferences to UI format
          const uiPrefs: UIPreference[] = Object.keys(preferenceMap).map(
            (key) => {
              const category = key as keyof typeof preferenceMap;
              const channelSettings = apiPrefs[category] as NotificationChannel;

              return {
                id: category,
                title: preferenceMap[category].title,
                description: preferenceMap[category].description,
                icon: preferenceMap[category].icon,
                email: channelSettings?.email ?? true,
                push: channelSettings?.push ?? true,
                sms: channelSettings?.sms ?? false,
              };
            }
          );

          setPreferences(uiPrefs);
        }
      } catch (error) {
        console.error("Failed to load notification preferences:", error);
        toast({
          title: "Error Loading Preferences",
          description:
            "Could not load your notification preferences. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  const handleToggleChange = (
    prefId: string,
    channel: "email" | "push" | "sms",
    checked: boolean
  ): void => {
    setPreferences((prevPreferences) =>
      prevPreferences.map((pref) =>
        pref.id === prefId ? { ...pref, [channel]: checked } : pref
      )
    );
  };

  const handleSavePreferences = async (): Promise<void> => {
    try {
      setIsSaving(true);

      // Convert UI preferences back to API format
      const apiPrefs: Partial<NotificationPreferences> = {};

      preferences.forEach((pref) => {
        const categoryKey = pref.id as keyof NotificationPreferences;
        //@ts-expect-error
        apiPrefs[categoryKey] = {
          email: pref.email,
          push: pref.push,
          sms: pref.sms,
          inApp: true,
        };
      });

      const response = await updateNotificationPreferences(apiPrefs);

      if (response.success) {
        toast({
          title: "Preferences Updated",
          description:
            "Your notification preferences have been saved successfully.",
          duration: 3000,
        });
      } else {
        throw new Error("Failed to update preferences");
      }
    } catch (error) {
      console.error("Failed to save notification preferences:", error);
      toast({
        title: "Error Saving Preferences",
        description:
          "Could not save your notification preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Skeleton loader for preferences
  const PreferenceSkeleton = () => (
    <div className="space-y-6">
      {[1, 2, 3, 4].map((index) => (
        <div key={index} className="grid grid-cols-4 gap-4 items-center py-3">
          <div className="col-span-1 flex items-center space-x-3">
            <div className="flex-shrink-0 h-9 w-9 rounded-full bg-[#20483f]/10 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-[#20483f]/10 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="col-span-1 flex justify-center">
            <div className="h-5 w-10 bg-[#20483f]/10 rounded-full animate-pulse"></div>
          </div>
          <div className="col-span-1 flex justify-center">
            <div className="h-5 w-10 bg-[#20483f]/10 rounded-full animate-pulse"></div>
          </div>
          <div className="col-span-1 flex justify-center">
            <div className="h-5 w-10 bg-[#20483f]/10 rounded-full animate-pulse"></div>
          </div>
          {index < 4 && (
            <Separator className="col-span-4 my-0 bg-[#20483f]/10" />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container py-12 max-w-4xl mx-auto px-4 sm:px-6"
    >
      <div className="mb-8">
        <Button
          variant="ghost"
          asChild
          className="mb-4 text-[#20483f] hover:bg-[#20483f]/5 -ml-3"
        >
          <Link href="/dashboard/notifications">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Notifications
          </Link>
        </Button>

        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-light tracking-tight text-[#20483f] mb-2"
        >
          Notification Preferences
        </motion.h1>
        <p className="text-[#20483f]/60 font-light max-w-2xl">
          Customize how and when you receive notifications from our luxury
          clothing store. Update your preferences below to tailor your
          communication experience.
        </p>
      </div>

      <Card className="border border-[#20483f]/10 shadow-sm overflow-hidden">
        <CardHeader className="bg-[#20483f]/5 border-b border-[#20483f]/10 pb-4">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-[#20483f]" />
            <CardTitle className="text-[#20483f] text-lg font-medium">
              Communication Channels
            </CardTitle>
          </div>
          <CardDescription className="text-[#20483f]/70">
            Select your preferred notification methods for each category
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6 grid grid-cols-4 gap-4 pb-4 border-b border-[#20483f]/10">
            <div className="col-span-1"></div>
            <div className="col-span-1 text-center">
              <Badge
                variant="outline"
                className="font-normal text-[#20483f] border-[#20483f]/20"
              >
                Email
              </Badge>
            </div>
            <div className="col-span-1 text-center">
              <Badge
                variant="outline"
                className="font-normal text-[#20483f] border-[#20483f]/20"
              >
                Push
              </Badge>
            </div>
            <div className="col-span-1 text-center">
              <Badge
                variant="outline"
                className="font-normal text-[#20483f] border-[#20483f]/20"
              >
                SMS
              </Badge>
            </div>
          </div>

          {isLoading ? (
            <PreferenceSkeleton />
          ) : (
            <motion.div
              className="space-y-6"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {preferences.map((preference, index) => (
                <motion.div
                  key={preference.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="grid grid-cols-4 gap-4 items-center py-3"
                >
                  <div className="col-span-1 flex items-center space-x-3">
                    <div className="flex-shrink-0 h-9 w-9 rounded-full bg-[#20483f]/10 flex items-center justify-center">
                      {preference.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[#20483f]">
                        {preference.title}
                      </h4>
                    </div>
                  </div>

                  <div className="col-span-1 flex justify-center">
                    <Switch
                      id={`${preference.id}-email`}
                      checked={preference.email}
                      onCheckedChange={(checked) =>
                        handleToggleChange(preference.id, "email", checked)
                      }
                      className="data-[state=checked]:bg-[#20483f]"
                    />
                  </div>

                  <div className="col-span-1 flex justify-center">
                    <Switch
                      id={`${preference.id}-push`}
                      checked={preference.push}
                      onCheckedChange={(checked) =>
                        handleToggleChange(preference.id, "push", checked)
                      }
                      className="data-[state=checked]:bg-[#20483f]"
                    />
                  </div>

                  <div className="col-span-1 flex justify-center">
                    <Switch
                      id={`${preference.id}-sms`}
                      checked={preference.sms}
                      onCheckedChange={(checked) =>
                        handleToggleChange(preference.id, "sms", checked)
                      }
                      className="data-[state=checked]:bg-[#20483f]"
                    />
                  </div>

                  {index < preferences.length - 1 && (
                    <Separator className="col-span-4 my-0 bg-[#20483f]/10" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="mt-8 pt-4 border-t border-[#20483f]/10 flex justify-end">
            <Button
              onClick={handleSavePreferences}
              disabled={isLoading || isSaving}
              className="bg-[#20483f] hover:bg-[#20483f]/90 text-white px-6"
            >
              {isSaving ? "Saving..." : "Save Preferences"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
