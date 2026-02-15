import { getSingleProductAction } from "@/lib/actions/product-action";
import { CreateProductForm } from "./_components/create-product-form";

interface Props {
  params: Promise<{ id: string }>;
}
const Page = async ({ params }: Props) => {
  const { id } = await params;

  const data = await getSingleProductAction(id);
  return <CreateProductForm initialData={data.product.product} />;
};

export default Page;
