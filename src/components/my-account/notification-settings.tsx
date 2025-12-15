"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function NotificationSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggleNotifications = async (checked: boolean) => {
    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setNotificationsEnabled(checked);

      toast({
        title: checked ? "Notifications enabled" : "Notifications disabled",
        description: checked
          ? "You will now receive notifications"
          : "You will no longer receive notifications",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update notification settings",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Choose whether you want to receive notifications or not.
          </p>
        </div>
        <Switch
          checked={notificationsEnabled}
          onCheckedChange={handleToggleNotifications}
          disabled={isSubmitting}
          className="data-[state=checked]:bg-green-600"
        />
      </div>
    </motion.div>
  );
}
