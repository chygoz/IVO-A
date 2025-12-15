"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

// Define validation schema
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(10, "Password must be at least 10 characters")
      .refine(
        (password) =>
          /[A-Za-z]/.test(password) &&
          /[0-9]/.test(password) &&
          /[^A-Za-z0-9]/.test(password),
        "Password must include alphabet, number, & special character"
      )
      .refine(
        (password) => /[a-z]/.test(password) && /[A-Z]/.test(password),
        "Password must include both lowercase and uppercase letters"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ChangePasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Watch the password field to check the requirements in real-time
  const watchedPassword = watch("newPassword");

  // Check password criteria
  const hasMinLength = watchedPassword?.length >= 10;
  const hasLowerAndUpper =
    /[a-z]/.test(watchedPassword) && /[A-Z]/.test(watchedPassword);
  const hasAlphaNumericSpecial =
    /[A-Za-z]/.test(watchedPassword) &&
    /[0-9]/.test(watchedPassword) &&
    /[^A-Za-z0-9]/.test(watchedPassword);

  const handleFormSubmit = async (data: PasswordFormValues) => {
    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Password updated",
        description: "Your password has been successfully changed.",
      });

      // Reset the form after successful submission
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Enter Current Password</Label>
        <Input
          id="currentPassword"
          type="password"
          {...register("currentPassword")}
          placeholder="Enter password"
        />
        {errors.currentPassword && (
          <p className="text-sm text-red-500">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          type="password"
          {...register("newPassword")}
          placeholder="Enter passworde"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.newPassword && (
          <p className="text-sm text-red-500">{errors.newPassword.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          placeholder="Enter password"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <p className="text-sm font-medium mb-3">Your Password must contain:</p>
        <ul className="space-y-2">
          <li className="flex items-center text-sm">
            {hasMinLength ? (
              <Check className="h-4 w-4 mr-2 text-green-500" />
            ) : (
              <X className="h-4 w-4 mr-2 text-gray-300" />
            )}
            <span className={hasMinLength ? "text-green-700" : "text-gray-500"}>
              At least 10 characters long
            </span>
          </li>
          <li className="flex items-center text-sm">
            {hasAlphaNumericSpecial ? (
              <Check className="h-4 w-4 mr-2 text-green-500" />
            ) : (
              <X className="h-4 w-4 mr-2 text-gray-300" />
            )}
            <span
              className={
                hasAlphaNumericSpecial ? "text-green-700" : "text-gray-500"
              }
            >
              Must include alphabet, number, & character
            </span>
          </li>
          <li className="flex items-center text-sm">
            {hasLowerAndUpper ? (
              <Check className="h-4 w-4 mr-2 text-green-500" />
            ) : (
              <X className="h-4 w-4 mr-2 text-gray-300" />
            )}
            <span
              className={hasLowerAndUpper ? "text-green-700" : "text-gray-500"}
            >
              A lowercase and uppercase letter
            </span>
          </li>
        </ul>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-800 hover:bg-green-700 text-white"
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </motion.form>
  );
}
