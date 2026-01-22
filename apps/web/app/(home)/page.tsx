import { Footer } from "./_components/footer";
import { NavMenu } from "./_components/nav-menu";

export default function Page() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <NavMenu />
      <Footer />
    </div>
  );
}
