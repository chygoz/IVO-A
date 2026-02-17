"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import * as zod from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { doCredentialLogin } from "@/actions/login";
import ButtonText from "@/components/ui/buttonText";
import { PasswordInput } from "@/components/ui/password-input";
import SendOTP from "../send.otp";
import { useSession } from "next-auth/react";

type SigninFormProps = {
  cb?: () => void;
};

function SigninForm({ cb }: SigninFormProps) {
  const [error, setError] = React.useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { status, update } = useSession();
  const defaultRedirect =
    pathname === "/auth/signin"
      ? "/dashboard"
      : pathname.startsWith("/dashboard")
        ? `${pathname}?login=1`
        : pathname;
  const [isLoading, setIsLoading] = React.useState(false);
  const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(5, "Password must be at least 5 characters"),
  });

  const {
    getValues,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<zod.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = async ({
    email,
    password,
  }: zod.infer<typeof signinSchema>) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    setIsLoading(true);
    const result = await doCredentialLogin(formData, defaultRedirect);
    if (result?.error) {
      setError(result.error || "Something went wrong");
    } else {
      toast.success("Logged in successfully");
      try {
        const refreshedSession = await update();
        if (!refreshedSession) {
          window.location.assign(defaultRedirect);
          return;
        }
        router.replace(defaultRedirect);
        router.refresh();
      } catch {
        window.location.assign(defaultRedirect);
        return;
      }
      if (cb && typeof cb === "function") {
        cb();
      }
    }
    setIsLoading(false);
  };

  if (error === "email not verified") {
    return <SendOTP email={getValues().email} />;
  }

  return (
    <div className="py-4">
      {error && (
        <div className="my-4">
          <span className="text-red-500">{error}</span>
        </div>
      )}
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex flex-col gap-4 w-full md:min-w-[400px] mt-6 "
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input type="email" {...field} />}
          />
          {errors.email && (
            <span className="text-red-500">{errors["email"].message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between ">
            <label htmlFor="password">Password</label>
          </div>

          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <PasswordInput {...field} />}
          />
          {errors.password && (
            <span className="text-red-500">{errors["password"].message}</span>
          )}
        </div>
        <Button className="" size="lg" disabled={isLoading} type="submit">
          <ButtonText loading={isLoading}>Sign in</ButtonText>
        </Button>
      </form>
    </div>
  );
}

export default SigninForm;
