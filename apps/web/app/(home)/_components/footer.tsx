import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-foreground/5 border-t border-border mt-16 py-12">
      <div className="container-default grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h4 className="font-semibold text-foreground mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="#" className="hover:text-primary">
                Categories
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                Deals
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                Best Sellers
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-4">Vendors</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="#" className="hover:text-primary">
                Become Vendor
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                Vendor Login
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                Seller Center
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="#" className="hover:text-primary">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="#" className="hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {currentYear} MultiMart. All rights reserved.</p>
      </div>
    </footer>
  );
};
