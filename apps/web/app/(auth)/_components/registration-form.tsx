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
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { useState } from "react";
import { RegistrationVerification } from "./registration-verification";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const RegisterForm = () => {
  const [step, setStep] = useState<"register" | "verify">("register");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

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

  const registerUser = async (data: z.input<typeof registrationSchema>) => {
    const response = await axios.post(
      `http://localhost:6001/api/v1/auth/registration`,
      data
    );
    return response.data;
  };

  const registerOTP = async (email: string) => {
    const response = await axios.post(
      `http://localhost:6001/api/v1/auth/registration/registration-otp`,
      { email }
    );
    return response.data;
  };

  const registerMutation = useMutation({
    mutationFn: registerUser,

    onSuccess: async (data) => {
      if (data.user.id) {
        const otp = await registerOTP(data.user.email);
        if (otp.success === true) {
          toast.success("Please check your email");
          setEmail(data.user.email);
          setStep("verify");
        }
      }
    },
    onError: async (error: AxiosError) => {
      if (error.status === 406) {
        router.push("/verify-email");
      }
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "An error occurred";
      toast.error(errorMessage);
    },
  });
  // verify otp
  const handleRegistrationOtp = async () => {
    const response = await axios.post(
      `http://localhost:6001/api/v1/auth/registration/verify-email`,
      { email, otp }
    );
    if (response.data.success === true) {
      {
        toast.success("Success", {
          description: "You are successfully registered",
        });
      }
      router.push("/sign-in");
    } else {
      {
        toast.error(`${response.data.error.body.message}`);
      }
    }
  };
  function onSubmit(data: z.input<typeof registrationSchema>) {
    registerMutation.mutate(data);
  }
  return (
    <>
      {step === "register" ? (
        <AuthLayout
          title="Create your account"
          description="Enter required information to create an account"
          backButtonLink="/sign-in"
          backButtonText="Sign In"
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
                      <FieldLabel htmlFor="registration-id-name">
                        Name
                      </FieldLabel>
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
                      <FieldLabel htmlFor="registration-id-email">
                        Email
                      </FieldLabel>
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
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="registration-id-role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USER">User</SelectItem>
                          <SelectItem value="SELLER">Seller</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <FieldLabel htmlFor="registration-id-phone">
                        Phone
                      </FieldLabel>
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
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button type="submit" form="registration-id">
                Submit
              </Button>
            </Field>
          </div>
        </AuthLayout>
      ) : (
        <RegistrationVerification
          loading={registerMutation.isPending}
          onOTP={otp}
          setOTP={setOtp}
          validTill={300}
          onSubmit={handleRegistrationOtp}
        />
      )}
    </>
  );
};
