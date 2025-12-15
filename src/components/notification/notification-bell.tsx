"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useNotifications } from "@/providers/notification-provider";
import { BellIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

const NotificationBell: React.FC = () => {
  const [open, setOpen] = useState(false);

  const {
    notifications,
    unreadCount,
    isLoading,
    error,
    fetchNotifications,
    markAllAsRead,
    handleNotificationClick,
  } = useNotifications();

  // Fetch notifications when opening dropdown
  useEffect(() => {
    if (open) {
      fetchNotifications(1, 10);
    }
  }, [open, fetchNotifications]);

  // Format notification time
  const formatNotificationTime = (timestamp: string): string => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (err) {
      return "Recently";
    }
  };

  // Render notification icon based on type
  const renderNotificationIcon = (type: string) => {
    switch (type) {
      case "transaction":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#20483f]/10 text-[#20483f]/70 dark:bg-[#20483f]/20 dark:text-[#20483f]/90">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
      case "order":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#20483f]/10 text-[#20483f] dark:bg-[#20483f]/20 dark:text-[#20483f]/90">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#20483f]/10 text-[#20483f] dark:bg-[#20483f]/20 dark:text-[#20483f]/90">
            <BellIcon className="h-4 w-4" />
          </div>
        );
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-full border border-white/30 bg-[#20483f]/10 hover:bg-[#20483f]/20"
            aria-label="Notifications"
          >
            <BellIcon className="h-5 w-5 text-[#20483f]" />
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-1 -right-1"
              >
                <Badge
                  variant="destructive"
                  className="h-5 w-5 rounded-full flex items-center justify-center p-0 text-xs bg-[#20483f] text-white border-2 border-white shadow-md"
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Badge>
              </motion.div>
            )}
          </Button>
        </motion.div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[350px] sm:w-[400px] p-0 border border-white/20 shadow-xl rounded-xl overflow-hidden bg-white"
        align="end"
        sideOffset={8}
      >
        <div className="flex items-center justify-between p-4 bg-[#20483f]/5">
          <h3 className="font-medium text-[#20483f]">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-[#20483f] hover:bg-[#20483f]/10"
              onClick={() => markAllAsRead()}
            >
              <CheckIcon className="h-3.5 w-3.5 mr-1" />
              Mark all as read
            </Button>
          )}
        </div>
        <Separator className="bg-[#20483f]/10" />
        <ScrollArea className="h-[350px]">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#20483f] border-t-transparent" />
            </div>
          ) : error ? (
            <div className="p-4 text-sm text-destructive">{error}</div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-[#20483f]/5 flex items-center justify-center">
                <BellIcon className="h-6 w-6 text-[#20483f]/40" />
              </div>
              <p className="mt-3 text-sm text-[#20483f]/60 font-light">
                No notifications yet
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`truncate px-4 py-3 border-b border-[#20483f]/10 last:border-0 hover:bg-[#20483f]/5 cursor-pointer transition-colors duration-200 ${
                    !notification.read ? "bg-[#20483f]/5" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start truncate">
                    <div className="flex-shrink-0 mr-3">
                      {renderNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p className="text-sm font-medium text-[#20483f]">
                        {notification.title}
                      </p>
                      <p className="text-sm text-[#20483f]/70 truncate">
                        {notification.message}
                      </p>
                      <p className="text-xs text-[#20483f]/50 mt-1 font-light">
                        {formatNotificationTime(notification.createdAt)}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="ml-2 mt-1">
                        <div className="h-2 w-2 rounded-full bg-[#20483f]" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </ScrollArea>
        <Separator className="bg-[#20483f]/10" />
        <div className="p-2 bg-[#20483f]/5">
          <Button
            variant="ghost"
            size="sm"
            className="w-full h-9 text-xs text-[#20483f] hover:bg-[#20483f]/10 transition-colors"
            asChild
          >
            <Link
              href="/dashboard/notifications"
              onClick={() => setOpen(false)}
            >
              View all notifications
            </Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
