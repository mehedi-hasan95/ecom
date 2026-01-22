"use client";

import { sessionAction } from "@/lib/actions/auth-server-action";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";

export const UserImage = () => {
  const { data } = useQuery({
    queryKey: ["sessions"],
    queryFn: sessionAction,
  });
  const initials = data?.user.name
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
  return (
    <>
      <Avatar className="cursor-pointer">
        <AvatarImage
          src={data?.user.image || "https://github.com/shadcn.png"}
          alt={data?.user.name}
        />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </>
  );
};
