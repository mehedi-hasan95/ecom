"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  forgetPasswordEmailAction,
  forgetPasswordEmailOtpAction,
  resetPasswordAction,
} from "@/lib/actions/auth-action";
import { EmailVerificationForm } from "../../_components/email-verification-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EmailOtpVerification } from "../../_components/email-otp-verification";
import { UpdatePasswordForm } from "../../_components/update-password-form";

export const ForgetPasswordForm = () => {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  // Reset password email
  const getEmailMutation = useMutation({
    mutationFn: forgetPasswordEmailAction,
    onSuccess: (data) => {
      toast.success("Success", { description: data.message });
      setStep("otp");
    },
    onError: (error) => {
      toast.error("Error", { description: error.message });
    },
  });

  // verify the OTP
  const verifyOtpMutation = useMutation({
    mutationFn: forgetPasswordEmailOtpAction,
    onSuccess: (data) => {
      toast.success("Success", { description: data.message });
      setStep("reset");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Reset forgot password
  const resetPasswordMutation = useMutation({
    mutationFn: resetPasswordAction,
    onSuccess: (data) => {
      router.push("/sign-in");
      toast.success(data.message);
    },
    onError: (error) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    },
  });
  return (
    <>
      {step === "email" ? (
        <EmailVerificationForm
          email={email}
          loading={getEmailMutation.isPending}
          onSubmit={() => getEmailMutation.mutate({ email })}
          disabled={false}
          onEmailChange={setEmail}
          headerTitle="Lost your key? Let’s get you back inside."
          headerDesc="Type in your email and we’ll help you create a fresh password so you can get back to the good stuff."
        />
      ) : step === "otp" ? (
        <EmailOtpVerification
          loading={verifyOtpMutation.isPending}
          onOTP={otp}
          onSubmit={() => verifyOtpMutation.mutate({ email, otp })}
          setOTP={setOtp}
        />
      ) : (
        <UpdatePasswordForm
          email={email}
          otp={otp}
          onSubmit={(data) => resetPasswordMutation.mutate(data)}
          loading={resetPasswordMutation.isPending}
        />
      )}
    </>
  );
};
