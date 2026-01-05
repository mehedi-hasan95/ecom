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
import { registrationSchema } from "@workspace/open-api/schemas/auth.schemas";

export const RegisterForm = () => {
  const form = useForm<z.input<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      role: "USER", // Ensure this is also present
    },
  });
  function onSubmit(data: z.input<typeof registrationSchema>) {
    console.log(data);
  }
  return (
    <AuthLayout
      title="Create your account"
      description="Enter required information to create an account"
      link="/sign-in"
      hrefText="Sign In"
      className="max-w-lg"
    >
      <div className="">
        <form id="registration-id" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="registration-id-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="registration-id-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Jone Doe"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="registration-id-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="registration-id-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@domain.com"
                    autoComplete="off"
                    type="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="registration-id-role">
                    User Role
                  </FieldLabel>
                  <Input
                    {...field}
                    id="registration-id-role"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="registration-id-phone">Phone</FieldLabel>
                  <Input
                    {...field}
                    id="registration-id-phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="012345678"
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
                  <FieldLabel htmlFor="registration-id-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="registration-id-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="******"
                    autoComplete="off"
                    type="password"
                  />
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
                  <FieldLabel htmlFor="registration-id-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="registration-id-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="******"
                    autoComplete="off"
                    type="password"
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
          <Button type="submit" form="registration-id">
            Submit
          </Button>
        </Field>
      </div>
    </AuthLayout>
  );
};
