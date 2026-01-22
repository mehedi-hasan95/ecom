"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import Link from "next/link";
import { useGetSession, useLogout } from "@/hooks/use-auth";
import { LoadingButton } from "@/components/common/loading-button";

export const Author = () => {
  const { user } = useGetSession();
  const initials = user?.name
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
  const { mutate, isPending } = useLogout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={user?.image || "https://github.com/shadcn.png"}
            alt={user?.name}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>My Dashboard</DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link href={"/dashboard"}>
            <DropdownMenuItem>
              Dashboard
              <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuItem
          className={`w-full flex justify-between disabled:${isPending}`}
          onClick={() => mutate()}
        >
          {isPending ? (
            <LoadingButton />
          ) : (
            <>
              Log Out
              <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
