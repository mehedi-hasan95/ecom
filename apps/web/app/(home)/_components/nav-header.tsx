import { Logo } from "@/components/common/logo";
import { Input } from "@workspace/ui/components/input";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { Navigation } from "./navigation";

export const NavHeader = () => {
  return (
    <div className="flex items-center justify-between h-16 sticky top-0 z-50">
      <Logo />
      {/* <div className="hidden md:flex flex-1 mx-8"> */}
      <div className="w-full max-w-md relative">
        <Input
          type="text"
          placeholder="Search products, brands, and vendors..."
          className="pl-4 pr-10 bg-secondary border-border"
        />
        <Search className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground" />
      </div>
      {/* </div> */}
      <div className="flex items-center gap-4">
        <Heart />
        <ShoppingBag />
        <Navigation />
      </div>
    </div>
  );
};
