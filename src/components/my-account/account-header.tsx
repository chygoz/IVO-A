"use client";
import { UserProfile } from "./types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import Image from "next/image";

interface AccountHeaderProps {
  user: UserProfile;
}

export default function AccountHeader({ user }: AccountHeaderProps) {
  // Get initials for avatar fallback
  const getInitials = () => {
    const firstInitial = user.firstName ? user.firstName.charAt(0) : "";
    const lastInitial = user.lastName ? user.lastName.charAt(0) : "";
    return (firstInitial + lastInitial).toUpperCase();
  };

  const avatarStyle = {
    backgroundColor: "#4ade80",
    color: "#20483f",
  };

  return (
    <motion.div
      className="flex items-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Avatar className="h-16 w-16 mr-4" style={avatarStyle}>
        {user.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            width={400}
            height={400}
            alt={`${user.firstName} ${user.lastName}`}
          />
        ) : (
          <AvatarFallback>{getInitials()}</AvatarFallback>
        )}
      </Avatar>

      <div>
        <h2 className="text-xl font-bold capitalize">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </motion.div>
  );
}
