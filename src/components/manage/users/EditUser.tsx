"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ButtonText from "@/components/ui/buttonText";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { changePartnerUserRole, Member } from "@/actions/business";
import { useState } from "react";

type UserActionProps = {
  current_partner: string;
  user: Member;
};

export function EditUser({ current_partner, user }: UserActionProps) {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(user.role ?? "");
  const queryClient = useQueryClient();

  const changeRoleMutation = useMutation({
    mutationFn: () => changePartnerUserRole(user.user._id, role),
    onSuccess: () => {
      toast.success("user removed successfully");
      queryClient.invalidateQueries({
        queryKey: [`my-users-${current_partner}`],
      });
      setOpen(false);
    },
  });

  const handleChangeRole = () => {
    if (!role) {
      return;
    }
    changeRoleMutation.mutate();
  };
  const roles = [
    { id: "admin", name: "Administrator" },
    { id: "product", name: "Product Manager" },
    { id: "order", name: "Order Manager" },
    { id: "financial", name: "Financial Manager" },
    { id: "communications", name: "Communications Manager" },
  ];
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="flex items-center gap-2 bg-transparent">
        <Button className="bg-transparent w-full text-secondary hover:text-white">
          Edit User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Make changes to the user here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-4">
            <Label htmlFor="name">Role</Label>
            <RadioGroup defaultValue={role} onValueChange={setRole}>
              {
                roles.map(el => (
                  <>
                    <div className="flex items-center space-x-2" key={el.id}>
                      <RadioGroupItem value={el.id} id={el.id} />
                      <Label htmlFor={el.id}>{el.name}</Label>
                    </div>
                  </>
                ))
              }
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleChangeRole}
            disabled={changeRoleMutation.isPending}
            type="submit"
          >
            <ButtonText loading={changeRoleMutation.isPending}>
              Save changes
            </ButtonText>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
