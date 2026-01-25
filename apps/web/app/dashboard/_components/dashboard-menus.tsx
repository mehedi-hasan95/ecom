import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@workspace/ui/components/sidebar";
import { DashboardLogo } from "./dashboard-logo";
import { DashboardUser } from "./dashboard-user";
import { DashboardMainMenus } from "./dashboard-main-menus";

export const DashboardMenus = () => {
  return (
    <Sidebar collapsible="icon" className="left-auto">
      <SidebarHeader>
        <DashboardLogo />
      </SidebarHeader>
      <SidebarContent>
        <DashboardMainMenus />
      </SidebarContent>
      <SidebarFooter>
        <DashboardUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
