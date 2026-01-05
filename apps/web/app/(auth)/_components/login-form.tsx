"use client";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field";
import { AuthLayout } from "../_components/auth-layout";
import { Button } from "@workspace/ui/components/button";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@workspace/ui/components/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@workspace/open-api/schemas/auth.schemas";

export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(data: z.input<typeof loginSchema>) {
    console.log(data);
  }
  return (
    <AuthLayout className="max-w-lg">
      <div className="">
        <form id="login-id" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-id-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="login-id-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@domain.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-id-password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="login-id-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="******"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <Field orientation="horizontal" className="pt-5">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="login-id">
            Submit
          </Button>
        </Field>
      </div>
    </AuthLayout>
  );
};
