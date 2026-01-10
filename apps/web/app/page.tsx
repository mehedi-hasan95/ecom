import { NavMenu } from "@/components/common/nav/nav-menu";
import { getSession } from "@/lib/get-session";

export default async function Page() {
  const data = await getSession();
  console.log(data);
  return (
    <div className="flex items-center justify-center min-h-svh">
      <NavMenu />
    </div>
  );
}
