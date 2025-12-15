"use client";
import { cancelInvite, Invite, resendInvite } from "@/actions/business";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ButtonText from "@/components/ui/buttonText";

type InviteeActionProps = {
  invitee: Invite;
  current_partner: string;
};

export function InviteeAction({
  invitee,
  current_partner,
}: InviteeActionProps) {
  const queryClient = useQueryClient();

  const resendMutation = useMutation({
    mutationFn: resendInvite,
    onSuccess: () => {
      toast.success("Invite resent successfully");
      queryClient.invalidateQueries({
        queryKey: [`my-invites-${current_partner}`],
      });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: cancelInvite,
    onSuccess: () => {
      toast.success("Invite cancelled successfully");
      queryClient.invalidateQueries({
        queryKey: [`my-invites-${current_partner}`],
      });
    },
  });

  const handleResend = () => {
    resendMutation.mutate(invitee.email);
  };

  const handleCancel = () => {
    cancelMutation.mutate(invitee.email);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem
          onClick={handleResend}
          disabled={resendMutation.isPending}
        >
          <ButtonText loading={resendMutation.isPending}>
            Resend Invite
          </ButtonText>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleCancel}
          disabled={cancelMutation.isPending}
        >
          <ButtonText loading={cancelMutation.isPending}>
            Cancel Invite
          </ButtonText>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
