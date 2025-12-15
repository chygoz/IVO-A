import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

type ParticipantCardProps = {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
  };
};

function ParticipantCard({ user }: ParticipantCardProps) {
  return (
    <div className="flex gap-4 items-center">
      <Avatar>
        <AvatarImage src={user?.avatar} alt="" />
        <AvatarFallback>
          {getInitials(`${user.firstName} ${user.lastName}`)}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="capitalize">
          {user.firstName} {user.lastName}
        </div>
      </div>
    </div>
  );
}

export default ParticipantCard;
