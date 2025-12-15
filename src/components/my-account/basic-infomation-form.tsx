"use client";

import { useFormToast } from "@/components/hooks/use-form-hook";
import { UserProfile } from "./types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

// Define validation schema
const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .regex(/^\d{8,15}$/, "Phone number must be between 8 and 15 digits"),
  homeAddress: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface BasicInformationFormProps {
  user: UserProfile;
  onSubmit: (data: UserProfile) => Promise<void>;
}

export default function BasicInformationFormImproved({
  user,
  onSubmit,
}: BasicInformationFormProps) {
  const { isSubmitting, handleSubmit: handleToastSubmit } = useFormToast({
    successTitle: "Profile updated",
    successMessage: "Your information has been successfully updated.",
    errorTitle: "Update failed",
    errorMessage: "There was a problem updating your profile.",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      homeAddress: user.homeAddress,
    },
  });

  const processSubmit = async (data: ProfileFormValues) => {
    await handleToastSubmit(async () => {
      //@ts-expect-error
      await onSubmit(data);
      reset(data); // Reset form state after successful submission
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit(processSubmit)}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" {...register("firstName")} placeholder="John" />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" {...register("lastName")} placeholder="Doe" />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          disabled
          id="email"
          type="email"
          {...register("email")}
          placeholder="johndoe@example.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          {...register("phoneNumber")}
          placeholder="08100000000"
        />
        {errors.phoneNumber && (
          <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="homeAddress">Home Address</Label>
        <Input
          id="homeAddress"
          {...register("homeAddress")}
          placeholder="Enter Address"
        />
        {errors.homeAddress && (
          <p className="text-sm text-red-500">{errors.homeAddress.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="bg-green-800 hover:bg-green-700 text-white"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Info."
          )}
        </Button>
      </div>
    </motion.form>
  );
}
