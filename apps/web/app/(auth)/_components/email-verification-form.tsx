import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { AuthLayout } from "./auth-layout";
import { Button } from "@workspace/ui/components/button";
import { LoadingButton } from "@/components/common/loading-button";

interface Props {
  email: string;
  loading: boolean;
  onSubmit: () => void;
  disabled?: boolean;
  onEmailChange?: (value: string) => void;
  headerTitle?: string;
  headerDesc?: string;
}
export const EmailVerificationForm = ({
  email,
  loading,
  onSubmit,
  disabled = true,
  onEmailChange,
  headerTitle = "Verification Email",
  headerDesc = "Verify you email to create your account",
}: Props) => {
  return (
    <AuthLayout
      backButtonLink=""
      backButtonText=""
      description={headerDesc}
      showFooter={false}
      title={headerTitle}
      className="max-w-md"
    >
      <div className="space-y-3">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={email}
          disabled={disabled}
          onChange={(e) => onEmailChange?.(e.target.value)}
        />
      </div>
      {loading ? (
        <LoadingButton />
      ) : (
        <Button className="mt-5" type="submit" onClick={onSubmit}>
          Verify Email
        </Button>
      )}
    </AuthLayout>
  );
};
