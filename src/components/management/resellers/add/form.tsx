"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useMutation } from "@tanstack/react-query";
import { createReseller } from "@/actions/users";
import { revalidatePage } from "@/actions/revalidate.tag";
import { usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ErrorAlert from "@/components/ui/error-alert";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "fullname is required",
  }),
  email: z.string().email(),
  phoneNumber: z.string().min(10, {
    message: "phone is required",
  }),
  gender: z.string().min(2, {
    message: "gender is required",
  }),
  age: z.string().min(2, {
    message: "age is required",
  }),
  homeAddress: z.string().min(2, {
    message: "Home address is required",
  }),
  businessName: z.string().min(2, {
    message: "Business name is required",
  }),
});

type AddResellerFormProps = {
  open: boolean;
  close: () => void;
};

function AddResellerForm({ open, close }: AddResellerFormProps) {
  const pathname = usePathname();
  const mutation = useMutation({
    mutationFn: createReseller,
    onSuccess() {
      close();
      revalidatePage(pathname);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      age: "",
      homeAddress: "",
      businessName: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const [firstName, lastName] = values.fullName.split(" ");
    mutation.mutate({
      firstName,
      lastName: lastName || "undefined",
      cohort: 2,
      dob: values.age,
      address: values.homeAddress,
      businessName: values.businessName,
      email: values.email,
      gender: values.gender as "male" | "female",
      phone: values.phoneNumber,
    });
  }

  return (
    <div>
      <p>Fill in the following Information</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Type full name here" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Type email here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Type phone number here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age (MM/YYYY)</FormLabel>
                  <FormControl>
                    <Input max={7} placeholder="MM / YYYY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="homeAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home Address</FormLabel>
                <FormControl>
                  <Input placeholder="Type address here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type reseller business name here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {mutation.isError ? (
            <ErrorAlert>{mutation.error.message}</ErrorAlert>
          ) : null}

          <Button
            disabled={mutation.isPending}
            loading={mutation.isPending}
            className="w-full"
            type="submit"
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AddResellerForm;
