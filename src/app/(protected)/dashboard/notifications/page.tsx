"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckIcon, BellIcon, Settings2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNotifications } from "@/providers/notification-provider";
import NotificationCard from "@/components/notification/notification-card";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  const {
    notifications,
    unreadCount,
    isLoading,
    error,
    pagination,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    handleNotificationClick,
  } = useNotifications();

  // Fetch notifications on initial load
  useEffect(() => {
    fetchNotifications(1, 10, activeTab === "unread");
  }, [activeTab, fetchNotifications]);

  // Handle tab change
  const handleTabChange = (value: string): void => {
    setActiveTab(value as "all" | "unread");
    fetchNotifications(1, 10, value === "unread");
  };

  // Handle pagination
  const handlePageChange = (page: number): void => {
    fetchNotifications(page, pagination.limit, activeTab === "unread");
  };

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxPages = 5;

    // Calculate which pages to show
    let startPage: number;
    let endPage: number;

    if (pagination.pages <= maxPages) {
      // Show all pages
      startPage = 1;
      endPage = pagination.pages;
    } else if (pagination.page <= 3) {
      // Near the start
      startPage = 1;
      endPage = maxPages;
    } else if (pagination.page >= pagination.pages - 2) {
      // Near the end
      startPage = pagination.pages - maxPages + 1;
      endPage = pagination.pages;
    } else {
      // In the middle
      startPage = pagination.page - 2;
      endPage = pagination.page + 2;
    }

    // Add pagination items
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={pagination.page === i}
            onClick={() => handlePageChange(i)}
            className={
              pagination.page === i
                ? "bg-[#20483f] text-white hover:bg-[#20483f]/90"
                : "text-[#20483f] hover:bg-[#20483f]/10"
            }
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add ellipsis at start if needed
    if (startPage > 1) {
      items.unshift(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis className="text-[#20483f]/60" />
        </PaginationItem>
      );
    }

    // Add ellipsis at end if needed
    if (endPage < pagination.pages) {
      items.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis className="text-[#20483f]/60" />
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container py-12 max-w-4xl mx-auto px-4 sm:px-6"
    >
      <div className="mb-10 text-center">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-light tracking-tight text-[#20483f] mb-2 sm:text-4xl"
        >
          Your Notifications
        </motion.h1>
        <p className="text-[#20483f]/60 font-light max-w-xl mx-auto">
          Stay updated with your orders, special offers, and announcements from
          our luxury collection
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 shadow-sm rounded-xl border border-[#20483f]/10 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b border-[#20483f]/10">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full md:w-auto"
          >
            <TabsList className="mb-0 bg-[#20483f]/5 p-1 rounded-lg">
              <TabsTrigger
                value="all"
                className={`px-6 ${
                  activeTab === "all"
                    ? "bg-white dark:bg-slate-800 text-[#20483f] shadow-sm"
                    : "text-[#20483f]/70 hover:text-[#20483f] bg-transparent"
                }`}
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className={`px-6 flex items-center ${
                  activeTab === "unread"
                    ? "bg-white dark:bg-slate-800 text-[#20483f] shadow-sm"
                    : "text-[#20483f]/70 hover:text-[#20483f] bg-transparent"
                }`}
              >
                Unread
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="ml-2 bg-[#20483f] text-white"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mt-4 md:mt-0 flex space-x-3 justify-end">
            <Button
              variant="outline"
              asChild
              className="border-[#20483f]/20 text-[#20483f] hover:bg-[#20483f]/5 hover:text-[#20483f] hover:border-[#20483f]/30"
            >
              <Link href="/dashboard/notifications/preferences">
                <Settings2Icon className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>

            {unreadCount > 0 && (
              <Button
                variant="secondary"
                onClick={() => markAllAsRead()}
                className="bg-[#20483f]/10 text-[#20483f] hover:bg-[#20483f]/20 border border-[#20483f]/10"
              >
                <CheckIcon className="h-4 w-4 mr-2" />
                Mark All as Read
              </Button>
            )}
          </div>
        </div>

        <div className="p-6">{renderNotifications()}</div>
      </div>
    </motion.div>
  );

  function renderNotifications() {
    if (isLoading) {
      return (
        <div className="flex justify-center py-16">
          <div className="relative h-12 w-12">
            <div className="absolute h-12 w-12 rounded-full border-2 border-[#20483f]/20"></div>
            <div className="absolute h-12 w-12 rounded-full border-t-2 border-[#20483f] animate-spin"></div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <Alert
          variant="destructive"
          className="border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }

    if (notifications.length === 0) {
      return (
        <div className="bg-[#20483f]/5 rounded-xl p-12 text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border border-[#20483f]/10 shadow-sm">
            <BellIcon className="h-8 w-8 text-[#20483f]/40" />
          </div>
          <h3 className="mt-4 text-xl font-light text-[#20483f]">
            No notifications
          </h3>
          <p className="mt-2 text-[#20483f]/60 max-w-md mx-auto">
            {activeTab === "unread"
              ? "You've read all your notifications. Check back later for updates on your luxury items."
              : "You don't have any notifications yet. We'll notify you about orders, promotions, and new arrivals."}
          </p>
        </div>
      );
    }

    return (
      <>
        <AnimatePresence>
          <div className="space-y-5">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification._id}
                notification={notification}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
                onClick={handleNotificationClick}
              />
            ))}
          </div>
        </AnimatePresence>

        {pagination.pages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      handlePageChange(Math.max(1, pagination.page - 1))
                    }
                    className="text-[#20483f] hover:bg-[#20483f]/5 hover:text-[#20483f]"
                  />
                </PaginationItem>

                {renderPaginationItems()}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      handlePageChange(
                        Math.min(pagination.pages, pagination.page + 1)
                      )
                    }
                    className="text-[#20483f] hover:bg-[#20483f]/5 hover:text-[#20483f]"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </>
    );
  }
}
