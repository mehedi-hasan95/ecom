import { fromatPrice } from "@/lib/lib";
import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  image: string;
  sellerName: string;
  sellerImage?: string;
  title: string;
  price: number;
  colors?: string[];
  isTrending: string;
}
export const ProductCard = ({
  image,
  sellerName,
  sellerImage,
  title,
  price,
  colors,
  isTrending,
}: Props) => {
  return (
    <div className="relative border p-1 dark:border-none dark:p-0">
      <div className="relative">
        <div
          className={cn(
            "w-[60%] px-5 py-2 dark:bg-gray-700 rounded-t-3xl flex items-center gap-3 before:content-[''] before:absolute before:bg-transparent before:h-full before:top-0 before:right-0 before:w-[40%] before:rounded-bl-[30px] before:shadow-[-5px_10px_0_#fff] dark:border-none dark:before:shadow-[-5px_10px_0_#000] ",
          )}
        >
          <Image
            src={sellerImage ?? "/logo.png"}
            alt=""
            height={35}
            width={35}
            className="flex-0"
          />
          <div className="flex-1">
            <p>{sellerName}</p> <span>Subscribe</span>
          </div>
        </div>
        <div className="right-0 top-0 absolute rounded-full border-2 dark:border-none flex justify-center items-center dark:bg-gray-600 w-[calc(40%-10px)] h-full font-bold">
          {isTrending}
        </div>
      </div>
      <div className="dark:bg-gray-700 rounded-b-3xl rounded-tr-3xl px-5">
        <Image
          src={image}
          alt=""
          height={500}
          width={500}
          className="aspect-video pt-5"
        />
        <div className="py-4">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              {title}
            </h2>
            <h4 className="font-bold">{fromatPrice(price)}</h4>
          </div>
          <div className="flex justify-between items-center">
            <Link href={"#"}>Buy now</Link>
            {colors ? (
              <div className="flex flex-col items-center">
                <p>Color</p>
                <div className="flex gap-2">
                  {colors.map((item) => (
                    <div
                      key={item}
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: item }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              "No color"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
