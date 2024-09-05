import dayjs from "dayjs";
import { redirect } from "next/navigation";

const Page = async () => {
    redirect(`/diaries/${dayjs().format("YYYY-MM-DD")}`);
};
export default Page;
