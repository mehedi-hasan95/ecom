"use client";
import { useGetSession } from "@/hooks/use-auth";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import {
  BaggageClaim,
  IdCard,
  Landmark,
  LayoutDashboard,
  PackagePlus,
  ShoppingBasket,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const generalMenus = [
  { name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { name: "Profile", url: "/dashboard/profile", icon: IdCard },
  { name: "Stripe", url: "/dashboard/stripe", icon: Landmark },
];

const vendorMenus = [
  { name: "Vendor", url: "/dashboard/vendor", icon: ShoppingBasket },
  {
    name: "Create Product",
    url: "/dashboard/vendor/create-product",
    icon: PackagePlus,
  },
  { name: "Orders", url: "/dashboard/vendor/orders", icon: BaggageClaim },
];
export const DashboardMainMenus = () => {
  const pathName = usePathname();
  const { user } = useGetSession();
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
      {user?.role === "SELLER" && (
        <>
          <SidebarGroupLabel>Vendors</SidebarGroupLabel>
          <SidebarMenu>
            {vendorMenus.map((item) => (
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
      )}
    </SidebarGroup>
  );
};
