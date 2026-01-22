import { NavHeader } from "./nav-header";
import { NavSeconderyMenu } from "./nav-secondery-menu";

export const NavMenu = () => {
  return (
    <nav className="bg-card border-b border-border">
      <div className="container-default">
        <NavHeader />
        <NavSeconderyMenu />
      </div>
    </nav>
  );
};
