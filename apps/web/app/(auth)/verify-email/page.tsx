import { Suspense } from "react";
import { VerifyEmailClient } from "./_components/verify-email-form";

const Page = async () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailClient />
    </Suspense>
  );
};

export default Page;
