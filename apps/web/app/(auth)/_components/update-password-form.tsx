"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthLayout } from "./auth-layout";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { LoadingButton } from "@/components/common/loading-button";

import z from "zod";
import { resetPasswordSchema } from "@workspace/open-api/schemas/auth.schemas";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface Props {
  email: string;
  otp: string;
  loading: boolean;
  onSubmit: (data: z.infer<typeof resetPasswordSchema>) => void;
}

export const UpdatePasswordForm = ({
  email,
  otp,
  loading,
  onSubmit: onSubmit2,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      email,
      otp,
    },
  });
  function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    onSubmit2(data);
  }

  return (
    <AuthLayout
      backButtonLink=""
      backButtonText=""
      showFooter={false}
      description="You’re almost back in! Choose a strong, memorable password to secure your account"
      title="Create a new beginning."
    >
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-password">Bug Title</FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="form-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="******"
                    autoComplete="off"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-cPassword">
                  Confirm Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="form-cPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="******"
                    autoComplete="off"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <div className="mt-5">
          {loading ? (
            <LoadingButton />
          ) : (
            <Button type="submit" form="form-rhf-demo">
              Submit
            </Button>
          )}
        </div>
      </form>
    </AuthLayout>
  );
};
