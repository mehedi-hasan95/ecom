interface Props {
  children: React.ReactNode;
}
const Page = async ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {children}
    </div>
  );
};

export default Page;
