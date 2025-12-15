"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { PasswordInput } from "@/components/ui/password-input";
import { useMutation } from "@tanstack/react-query";
import { createStaff } from "@/actions/users/staff";
import ButtonText from "@/components/ui/buttonText";
import ErrorAlert from "@/components/ui/error-alert";
import { revalidatePage } from "@/actions/revalidate.tag";
import { usePathname } from "next/navigation";

// Define the validation schema with Zod
const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" }),
  identifier: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  role: z.string({ required_error: "Please select a role" }),
  access: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  changePasswordOnFirstLogin: z.boolean().default(true),
});

// Define roles for an ecommerce store
const roles = [
  { id: "admin", name: "Administrator" },
  { id: "product", name: "Product Manager" },
  { id: "order", name: "Order Manager" },
  { id: "financial", name: "Financial Manager" },
  { id: "communications", name: "Communications Manager" },
];

type StaffFormProps = {
  close: () => void;
};

export default function StaffForm({ close }: StaffFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      identifier: "",
      phoneNumber: "",
      access: "",
      changePasswordOnFirstLogin: true,
    },
  });
  const pathname = usePathname();

  const mutation = useMutation({
    mutationFn: createStaff,
    onSuccess() {
      close();
      toast.success("Staff Created", {
        description: `${form.getValues(
          "fullName"
        )} has been added as ${form.getValues("role")}`,
      });
      form.reset();
      revalidatePage(pathname);
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const [firstName, lastName] = values.fullName.split(" ");
    mutation.mutate({
      firstName,
      lastName,
      email: values.identifier,
      password: values.access,
      phone: values.phoneNumber,
      role: values.role,
      requirePasswordChange: values.changePasswordOnFirstLogin ? "yes" : "no",
    });
    // You would typically send this data to your API
  };

  // Generate a random password
  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    form.setValue("access", password);
  };

  return (
    <>
      {mutation.isError ? (
        <ErrorAlert>{mutation.error.message}</ErrorAlert>
      ) : null}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          autoComplete="off"
        >
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Address */}
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    data-form-type="other"
                    type="text"
                    placeholder="example@web.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="eg 08137478399" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="access"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="relative flex-grow">
                      <PasswordInput
                        type="text"
                        autoComplete="new-password-staff"
                        data-form-type="other"
                        placeholder="Password"
                        {...field}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="ml-2"
                      onClick={generatePassword}
                    >
                      <RefreshCcw size={16} className="mr-2" /> Generate
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Change Password on First Login */}
          <FormField
            control={form.control}
            name="changePasswordOnFirstLogin"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Require password change on first login</FormLabel>
                </div>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            disabled={mutation.isPending}
            type="submit"
            className="w-full bg-primary hover:bg-primary/80"
          >
            <ButtonText loading={mutation.isPending}>Save Staff</ButtonText>
          </Button>
        </form>
      </Form>
    </>
  );
}
