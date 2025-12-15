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
import { createCategory } from "@/actions/category";
import { toast } from "sonner";
import ErrorAlert from "@/components/ui/error-alert";
import ButtonText from "@/components/ui/buttonText";
import { usePathname } from "next/navigation";
import { revalidatePage } from "@/actions/revalidate.tag";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Category name is required.",
  }),
});

type CreateCategoryFormProps = {
  closeModal: () => void;
};

function CreateCategoryForm({ closeModal }: CreateCategoryFormProps) {
  const pathname = usePathname();
  const mutation = useMutation({
    mutationFn: createCategory,
    onSettled() {
      toast.success("created successfully");
      closeModal();
      revalidatePage(pathname);
    },
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({ name: values.name });
  }
  function handleSubmit() {
    form.handleSubmit(onSubmit)();
  }

  return (
    <Form {...form}>
      <form className="space-y-8">
        {mutation.isError ? (
          <ErrorAlert>{mutation.error.message}</ErrorAlert>
        ) : null}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          onClick={handleSubmit}
          disabled={mutation.isPending}
          type="button"
        >
          <ButtonText loading={mutation.isPending}>Submit</ButtonText>
        </Button>
      </form>
    </Form>
  );
}

export default CreateCategoryForm;
