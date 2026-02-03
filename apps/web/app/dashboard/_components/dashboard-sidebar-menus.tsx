"use client";
import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = {
  name: string;
  url: string;
  icon: LucideIcon;
};
interface Props {
  sidebarLabel: string;
  menus: MenuItem[];
}
export const DashboardSidebarMenus = ({ menus, sidebarLabel }: Props) => {
  const pathName = usePathname();
  return (
    <>
      <SidebarGroupLabel>{sidebarLabel}</SidebarGroupLabel>
      <SidebarMenu>
        {menus.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              className={
                pathName === item.url
                  ? "bg-yellow-700 hover:bg-yellow-700 text-white"
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
    </>
  );
};
