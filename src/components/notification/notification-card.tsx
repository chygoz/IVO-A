"use client";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { CheckIcon, Trash2Icon } from "lucide-react";
import { Notification } from "@/providers/notification-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onClick: (notification: Notification) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkAsRead,
  onDelete,
  onClick,
}) => {
  // Format notification time
  const formatNotificationTime = (timestamp: string): string => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (err) {
      return "Recently";
    }
  };

  // Prevent event propagation for buttons
  const handleMarkAsReadClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    onMarkAsRead(notification._id);
  };

  const handleDeleteClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    onDelete(notification._id);
  };

  // Render notification icon based on type
  const renderNotificationIcon = () => {
    switch (notification.type) {
      case "transaction":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#20483f]/10 text-[#20483f] dark:bg-[#20483f]/20 dark:text-[#20483f]/90 border border-[#20483f]/20">
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#20483f]/10 text-[#20483f] dark:bg-[#20483f]/20 dark:text-[#20483f]/90 border border-[#20483f]/20">
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
        );
    }
  };

  // Render specific metadata based on notification type
  const renderMetadata = () => {
    const metadata = notification.metadata;
    if (!metadata) return null;

    switch (notification.type) {
      case "transaction":
        return (
          <div className="mt-3 bg-[#20483f]/5 rounded-lg p-4 text-sm">
            {metadata.orderId && (
              <p className="mb-2 flex items-center justify-between">
                <span className="font-medium text-[#20483f]/80">Order</span>
                <span className="font-light text-[#20483f]">
                  #{metadata.orderId}
                </span>
              </p>
            )}
            {metadata.amount && metadata.currency && (
              <p className="mb-2 flex items-center justify-between">
                <span className="font-medium text-[#20483f]/80">Amount</span>
                <span className="font-light text-[#20483f]">
                  {metadata.currency} {metadata.amount}
                </span>
              </p>
            )}
            {metadata.orderStatus && (
              <p className="mb-2 flex items-center justify-between">
                <span className="font-medium text-[#20483f]/80">Status</span>
                <span className="font-light text-[#20483f]">
                  {metadata.orderStatus}
                </span>
              </p>
            )}
            {metadata.transactionId && (
              <p className="flex items-center justify-between">
                <span className="font-medium text-[#20483f]/80">
                  Transaction ID
                </span>
                <span className="font-light text-[#20483f] text-xs">
                  {metadata.transactionId}
                </span>
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -3 }}
    >
      <Card
        className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${
          !notification.read
            ? "border-l-4 border-l-[#20483f] shadow-md"
            : "border-transparent"
        }`}
        onClick={() => onClick(notification)}
      >
        <CardContent className="p-5">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">{renderNotificationIcon()}</div>

            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium text-[#20483f]">
                  {notification.title}
                </h3>
                <div className="flex space-x-1">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleMarkAsReadClick}
                      className="h-8 w-8 rounded-full text-[#20483f] hover:bg-[#20483f]/10"
                      title="Mark as read"
                    >
                      <CheckIcon className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDeleteClick}
                    className="h-8 w-8 rounded-full text-[#20483f]/80 hover:text-[#20483f] hover:bg-[#20483f]/10"
                    title="Delete"
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="mt-1 text-[#20483f]/80 font-light">
                {notification.message}
              </p>

              {renderMetadata()}

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-[#20483f]/60 font-light">
                  {formatNotificationTime(notification.createdAt)}
                </span>

                {!notification.read && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-[#20483f]/10 text-[#20483f] hover:bg-[#20483f]/20 transition-colors font-normal"
                  >
                    Unread
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NotificationCard;
