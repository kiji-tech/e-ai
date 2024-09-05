import DiariesPage from "@/components/(client)/pages/diaries";
import { CalendarUtil } from "@/lib/calendar.util";
import { Tables } from "@/lib/database.types";
import { getSupabaseClient } from "@/lib/ssr.side.util";
import dayjs from "dayjs";
import { redirect } from "next/navigation";

type Props = {
    params: {
        date: string;
    };
};

const Page = async (props: Props) => {
    const supabase = getSupabaseClient();
    const { date } = props.params;
    console.log(date);
    if (!date) {
        console.warn("date is not found");
        redirect(`/diaries/${dayjs().format("YYYY-MM-DD")}`);
    }
    // データ習得
    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
        console.warn("session is not found");
        return;
    }

    // const { data, error } = await supabase.from("users").select("*");
    const dateList = CalendarUtil.createCalendar(dayjs(date).toDate());
    const { data: corrections } = await supabase
        .from("corrections")
        .select("*")
        .eq("user_id", session.user.id)
        .gte("target_date", dayjs([0][0]).format("YYYY-MM-DD 00:00:00"))
        .lte("target_date", dayjs(dateList[dateList.length - 1][6]).format("YYYY-MM-DD 00:00:00"));

    const correction = corrections!.filter((c: Tables<"corrections">) => {
        return dayjs(c.target_date).format("YYYY-MM-DD") === date;
    }) as Tables<"corrections">[];
    const words = correction
        ? await supabase
              .from("word")
              .select("*")
              .eq("target_date", date)
              .eq("user_id", session.user.id)
              .eq("delete_flag", false)
        : { data: [] };
    console.log(correction);
    return (
        <DiariesPage
            selectedDate={date}
            words={words.data as Tables<"word">[]}
            corrections={corrections as Tables<"corrections">[]}
        />
    );
};
export default Page;
