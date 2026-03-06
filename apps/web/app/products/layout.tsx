import { Logo } from "@/components/common/logo";
import { Footer } from "../(home)/_components/footer";
import { AuthButton } from "../(home)/_components/auth-button";
import { WishlistCount } from "@/components/common/products/wishlist-count";

interface Props {
  children: React.ReactNode;
}
const Page = async ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="flex-1 space-y-3">
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="container-default px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Logo />
              <div className="flex items-center gap-3">
                <WishlistCount />
                <AuthButton />
              </div>
            </div>
          </div>
        </header>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
