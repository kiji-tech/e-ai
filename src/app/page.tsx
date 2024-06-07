import { checkSession } from "@/lib/server.side.utili";
import { redirect } from "next/navigation";

const Home = async () => {
  if (await checkSession()) {
    redirect("/diaries");
  }

  // Landing Page
  return <>Landing Page</>;
};
export default Home;
