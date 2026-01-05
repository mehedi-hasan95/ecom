import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  link?: string;
  hrefText?: string;
  className?: string;
}
export const AuthLayout = ({
  children,
  title = "Login to your account",
  description = " Enter your email below to login to your account",
  link = "/register",
  hrefText = "Sign Up",
  className,
}: Props) => {
  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <Link href={link}>
            <Button variant={"link"}>{hrefText}</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex-col gap-2">
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-amber-500"></div>
          <p className="px-3 text-sm dark:text-gray-300">
            {link === "/register" ? "Login" : "Register"} with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 bg-amber-500"></div>
        </div>
        <Button variant="outline" className="w-full">
          {link === "/register" ? "Login" : "Register"} with Google
        </Button>
      </CardFooter>
    </Card>
  );
};
