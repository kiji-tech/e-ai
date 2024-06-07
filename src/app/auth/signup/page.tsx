import { redirect } from "next/navigation";
import SignUpPage from "../../../components/(client)/pages/sign.up";
import { checkSession } from "@/lib/server.side.utili";

const Page = async () => {
  if (await checkSession()) {
    redirect("/");
  }
  return <SignUpPage />;
};
export default Page;
