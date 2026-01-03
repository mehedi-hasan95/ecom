import { prisma } from "@workspace/db";
import { Button } from "@workspace/ui/components/button";

export default async function Page() {
  const data = await prisma.user.findMany();
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button>
        <h2 className="text-2xl">you have total {data.length}</h2>
        <p>{process.env.DATABASE_URL}</p>
      </div>
    </div>
  );
}
