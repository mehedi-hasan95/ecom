import getQueryClient from "@/lib/query-client";
import { SingleProductPage } from "./_components/single-product-page";
import { getSingleProductAction } from "@/lib/actions/product-action";

interface Props {
  params: Promise<{ id: string }>;
}
const Page = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products", id],
    queryFn: () => getSingleProductAction(id),
  });

  return (
    <div>
      <SingleProductPage id={id} />
    </div>
  );
};

export default Page;
