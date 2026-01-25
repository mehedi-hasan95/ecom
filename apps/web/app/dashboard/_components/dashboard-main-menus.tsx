"use client";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { Landmark, LayoutDashboard, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const generalMenus = [
  { name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { name: "Profile", url: "/dashboard/profile", icon: User },
  { name: "Stripe", url: "/dashboard/stripe", icon: Landmark },
];
export const DashboardMainMenus = () => {
  const pathName = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>General</SidebarGroupLabel>
      <SidebarMenu>
        {generalMenus.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              className={
                pathName === item.url
                  ? "bg-yellow-700 hover:bg-yellow-700"
                  : "hover:bg-yellow-700"
              }
            >
              <Link href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
