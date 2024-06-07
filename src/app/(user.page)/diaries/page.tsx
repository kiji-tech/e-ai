import DiariesPage from "@/components/(client)/pages/diaries";
import { checkSession } from "@/lib/server.side.utili";
import { redirect } from "next/navigation";

const Page = async () => {
  if (!checkSession()) {
    redirect("/auth/signin");
  }

  return <DiariesPage />;
};
export default Page;
