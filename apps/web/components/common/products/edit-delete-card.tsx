import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { ArrowRight, Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  image: string;
  title: string;
  href: string;
  quantity?: number;
  onDelete: () => void;
  updateAt: string;
}
export const EditDeleteCard = ({
  image = "https://github.com/shadcn.png",
  title,
  href,
  onDelete,
  quantity,
  updateAt,
}: Props) => {
  return (
    <Card className="group relative overflow-hidden bg-card hover:bg-card/80 border-border hover:border-primary/50 transition-all duration-300 cursor-pointer h-full">
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br `}
      />
      <div className="relative p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <Image
            src={image}
            alt={title}
            height={60}
            width={60}
            className="transition-transform duration-300 hover:scale-110"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-border">
              <Link href={href}>
                <DropdownMenuItem className="cursor-pointer hover:bg-muted">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="cursor-pointer hover:bg-muted text-destructive"
                onClick={onDelete}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
        </div>
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            {quantity && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Items
                </p>
                <p className="text-2xl font-bold text-primary">{quantity}</p>
              </div>
            )}
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Updated
              </p>
              <p className="text-sm font-medium text-foreground">{updateAt}</p>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            className={`w-full transition-all duration-200 hover:bg-primary bg-muted/50 text-white`}
          >
            View Category
            <ArrowRight
              className={`w-4 h-4 ml-2 transition-transform hover:translate-x-1`}
            />
          </Button>
        </div>
      </div>
    </Card>
  );
};
