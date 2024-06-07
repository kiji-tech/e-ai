import { redirect } from "next/navigation";
import SignInPage from "../../../components/(client)/pages/sign.in";
import { checkSession } from "@/lib/server.side.utili";

const Page = async () => {
  if (await checkSession()) {
    redirect("/diaries");
  }
  return <SignInPage />;
};
export default Page;
