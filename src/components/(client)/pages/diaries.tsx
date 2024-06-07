"use client";
import { Tables } from "@/lib/database.types";
import { Button, Textarea } from "../forms";
import Calendar from "../forms/calendar";
import { useEffect, useState } from "react";
import { z } from "zod";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "@/store";
import { supabase } from "@/lib/client.side.util";

const diarySchema = z.object({
  ja: z.string(),
  en: z.string(),
});
type DiarySchema = z.infer<typeof diarySchema>;

type Props = {};
export default function DiariesPage() {
  const { user } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDiary, setSelectedDiary] = useState({} as Tables<"diaries">);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<DiarySchema>({
    defaultValues: { ja: selectedDiary.ja || "", en: selectedDiary.en || "" },
    resolver: zodResolver(diarySchema),
  });

  useEffect(() => {
    fetchDiary();
  }, [selectedDate]);

  const fetchDiary = async () => {
    const { data, error } = await supabase
      .from("diaries")
      .select("*")
      .eq("target_date", dayjs(selectedDate).format("YYYY-MM-DD"))
      .eq("user_id", user.uid)
      .single();

    if (error) {
      setSelectedDiary({
        user_id: user.uid,
        target_date: dayjs(selectedDate).format("YYYY-MM-DD"),
      } as Tables<"diaries">);
      reset();
    } else {
      setSelectedDiary(data as unknown as Tables<"diaries">);
      setValue("ja", data.ja || "");
      setValue("en", data.en || "");
    }
  };

  const handler = async (schema: DiarySchema) => {
    setIsLoading(true);

    try {
      await supabase.from("diaries").upsert(
        {
          ...selectedDiary,
          ...schema,
        },
        { onConflict: "uid" }
      );
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row flex-wrap justify-between md:flex-nowrap">
      {/* カレンダー */}
      <div className="w-[calc(100%-32px)] m-4  md:w-[calc(30%-32px)]">
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={(date) => {
            setSelectedDate(date);
          }}
        />
      </div>
      {/* 日記入力 */}
      <div className="w-[calc(100%-32px)] m-4  md:w-[calc(30%-32px)]">
        <form onSubmit={handleSubmit(handler)}>
          <Textarea
            label={"日本語の日記"}
            options={{
              id: "ja",
              ...register("ja", { required: true }),
              disabled: isLoading,
            }}
            message={errors?.ja?.message}
          />
          <Textarea
            label={"英語の日記"}
            options={{
              id: "en",
              ...register("en", { required: true }),
              disabled: isLoading,
            }}
            message={errors?.en?.message}
          />
          <Button
            label="保存"
            options={{ type: "submit", disabled: isLoading }}
          />
        </form>
      </div>
      {/* AI解析結果 */}
      <div className="w-[calc(100%-32px)] m-4  md:w-[calc(30%-32px)]"></div>
    </div>
  );
}
