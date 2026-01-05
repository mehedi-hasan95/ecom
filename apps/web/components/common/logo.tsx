import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-400/70 flex items-center justify-center">
        <span className="text-white font-display font-bold text-xl">e</span>
      </div>
      <span className="font-display text-2xl font-semibold hidden sm:block">
        Com
      </span>
    </Link>
  );
};
