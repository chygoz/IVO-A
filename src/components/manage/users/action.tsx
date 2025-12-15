"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import { EditUser } from "./EditUser";
import ButtonText from "@/components/ui/buttonText";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Member, removePartnerUser } from "@/actions/business";

type UserActionProps = {
  current_partner: string;
  user: Member;
};

export function UserAction({ current_partner, user }: UserActionProps) {
  const queryClient = useQueryClient();

  const removeMutation = useMutation({
    mutationFn: removePartnerUser,
    onSuccess: () => {
      toast.success("user removed successfully");
      queryClient.invalidateQueries({
        queryKey: [`my-users-${current_partner}`],
      });
    },
  });

  const handleRemove = () => {
    removeMutation.mutate(user.user._id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <EditUser current_partner={current_partner} user={user} />
        <DropdownMenuItem
          className="text-center flex justify-center font-medium cursor-pointer hover:bg-red-100 hover:text-red-500"
          onClick={handleRemove}
          disabled={removeMutation.isPending}
        >
          <ButtonText loading={removeMutation.isPending}>
            Remove User
          </ButtonText>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
