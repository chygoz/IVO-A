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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormMessage,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "./textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inviteMember } from "@/actions/business";
import { Alert } from "./alert";
import { useState } from "react";
import ButtonText from "./buttonText";

const inviteMembersSchema = z.object({
  emails: z
    .array(z.string())
    .min(1, { message: "At least one email is required." }),
});
export type InviteMemberFormType = z.infer<typeof inviteMembersSchema>;

type InviteMemberProps = {
  currentPartner: string;
};

export function InviteMember({ currentPartner }: InviteMemberProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: inviteMember,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [`my-invites-${currentPartner}`],
      });
      setIsOpen(false);
    },
  });

  const form = useForm<InviteMemberFormType>({
    resolver: zodResolver(inviteMembersSchema),
    defaultValues: {
      emails: [],
    },
  });

  async function onSubmit({ emails }: InviteMemberFormType) {
    try {
      mutation.mutate(emails);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        asChild
        className="flex items-center gap-2 hover:bg-primary"
      >
        <Button>
          Invite Members{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Members</DialogTitle>
          <DialogDescription>
            Invite members to your organization. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              {mutation.isError && (
                <Alert className="bg-red-100 text-red-500">
                  {mutation.error?.message}
                </Alert>
              )}
              <div className="flex flex-col gap-2">
                <FormField
                  name="emails"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invite by email</FormLabel>
                      <FormControl>
                        <Textarea
                          style={{ resize: "none" }}
                          rows={5}
                          placeholder="Enter emails"
                          {...field}
                          // Transform the text into an array of emails
                          onChange={(e) => {
                            const value = e.target.value;
                            // Split the input value by commas and trim any whitespace
                            const emailsArray = value
                              .split(",")
                              .map((email) => email.trim());
                            // Update the field with the emails array
                            field.onChange(emailsArray);
                          }}
                          // Join the array back into a string to display in the textarea
                          value={field.value.join(", ")}
                        />
                      </FormControl>
                      <FormDescription className="text-sm text-muted-foreground">
                        Separate emails with a comma.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button disabled={mutation.isPending} type="submit">
                <ButtonText loading={mutation.isPending}>
                  Send Invite
                </ButtonText>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
