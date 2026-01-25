import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { Store } from "lucide-react";
import Link from "next/link";

export const DashboardLogo = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href={"/"}>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
          >
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <Store className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-xl md:text-2xl font-bold leading-tight">
              MultiMart
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
