"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "next-auth";
import UploadImage from "../ui/uploadImage";
import { useMutation } from "@tanstack/react-query";
import { updateMe } from "@/actions/user";
import { toast } from "sonner";
import ButtonText from "../ui/buttonText";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "full name is required",
  }),
  email: z.string().email(),
  phone: z.string(),
  username: z.string(),
  avatar: z.string().optional(),
});

type UserForm = {
  user: User;
};

function UserForm({ user }: UserForm) {
  const mutation = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      toast.success("updated successfully");
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: `${user.name ? user.name : ""}`,
      email: `${user.email ? user.email : ""}`,
      phone: "",
      username: ``,
      avatar: user.image || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({
      firstName: values.fullName.split(" ")[0],
      lastName: values.fullName.split(" ")[1],
      phone: values.phone,
      username: values.username,
      ...(values.avatar
        ? {
            avatar: values.avatar.split("|")[0],
            publicId: values.avatar.split("|")[1],
          }
        : {}),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-[480px] mt-10"
      >
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-5 my-8">
                  <Avatar className="h-20 w-20 font-bold">
                    <AvatarImage
                      src={field.value?.split("|")[0] || ""}
                      alt="@user"
                    />
                    <AvatarFallback>
                      {getInitials(user?.name ?? "")}
                    </AvatarFallback>
                  </Avatar>
                  <UploadImage
                    text="Change Image"
                    image={field.value || ""}
                    setImage={field.onChange}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  className="capitalize"
                  placeholder="Jackinson Sunamiya"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="+234 789 1734 999" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  disabled
                  placeholder="jackinsonsunamiya@spotfinda.app"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="jackinson.sunamiya" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={mutation.isPending}
          className="bg-primary"
          type="submit"
        >
          <ButtonText loading={mutation.isPending}>Save Changes</ButtonText>
        </Button>
      </form>
    </Form>
  );
}

export default UserForm;
