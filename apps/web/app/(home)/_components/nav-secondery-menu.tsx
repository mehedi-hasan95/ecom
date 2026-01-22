import Link from "next/link";

export const NavSeconderyMenu = () => {
  return (
    <div className="border-t border-border">
      <div className="">
        <div className="hidden md:flex items-center gap-6 h-12">
          {/* Categories Dropdown */}
          <p>All Categories</p>

          {/* Quick Links */}
          <Link
            href="/deals"
            className="text-foreground hover:text-primary text-sm transition-colors"
          >
            Today&apos;s Deals
          </Link>
          <Link
            href="/bestsellers"
            className="text-foreground hover:text-primary text-sm transition-colors"
          >
            Best Sellers
          </Link>

          <Link
            href="/help"
            className="text-foreground hover:text-primary text-sm transition-colors ml-auto"
          >
            Help
          </Link>
        </div>
      </div>
    </div>
  );
};
