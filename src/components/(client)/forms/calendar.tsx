"use client";

import { useEffect, useState } from "react";
import CalendarCell from "./calendar.cell";
import Button from "./button";
import dayjs from "dayjs";
import { Database, Tables } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const supabase = createClientComponentClient<Database>();

type Props = {
  selectedDate?: Date;
  setSelectedDate?: (date: Date) => void;
};
export default function Calendar({
  selectedDate = new Date(),
  setSelectedDate = () => {},
}: Props) {
  const [dateList, setDateList] = useState<Date[][]>([]);
  const [diaries, setDiaries] = useState<Tables<"diaries">[]>([]);

  useEffect(() => {
    createCalendar();
  }, [selectedDate]);

  useEffect(() => {
    searchDiaries();
  }, [dateList]);

  const createCalendar = () => {
    setDateList([]);
    let startDate = dayjs(selectedDate).startOf("month");
    let endDate = dayjs(selectedDate).endOf("month");
    let list = [];

    while (startDate.get("d") != 0) {
      startDate = startDate.subtract(1, "day");
    }
    while (endDate.get("d") != 6) {
      endDate = endDate.add(1, "day");
    }

    while (startDate.isBefore(endDate)) {
      list.push(startDate.toDate());
      startDate = startDate.add(1, "day");
    }

    list = list.sort((a, b) => a.getTime() - b.getTime());
    for (let i = 0; i < list.length; i += 7) {
      let week = [];
      for (let j = 0; j < 7; j++) {
        week.push(list[i + j]);
      }
      setDateList((prev) => [...prev, week]);
    }
  };

  const searchDiaries = async () => {
    if (dateList.length === 0) return;
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      console.warn("session is not found");
      return;
    }
    // const { data, error } = await supabase.from("users").select("*");
    const { data, error } = await supabase
      .from("diaries")
      .select("*")
      .eq("user_id", session.user.id)
      .gte("target_date", dayjs(dateList[0][0]).format("YYYY-MM-DD 00:00:00"))
      .lte(
        "target_date",
        dayjs(dateList[dateList.length - 1][6]).format("YYYY-MM-DD 00:00:00")
      );
    setDiaries(data as Tables<"diaries">[]);
  };

  return (
    <div className="flex flex-col justify-start text-center">
      <div>{dayjs(selectedDate).format("YYYY年MM月")}</div>
      {/* カレンダー（曜日） */}
      <div className="flex flex-row justify-center  text-center">
        <div className="py-2 px-4 border-t border-b border-l border-r w-40">
          日
        </div>
        <div className="py-2 px-4 border-t border-b border-r w-40">月</div>
        <div className="py-2 px-4 border-t border-b border-r w-40">火</div>
        <div className="py-2 px-4 border-t border-b border-r w-40">水</div>
        <div className="py-2 px-4 border-t border-b border-r w-40">木</div>
        <div className="py-2 px-4 border-t border-b border-r w-40">金</div>
        <div className="py-2 px-4 border-t border-b border-r w-40">土</div>
      </div>
      {/* カレンダー（日付） */}
      {dateList.map((week, i) => {
        return (
          <div className="flex flex-row justify-center" key={`week${i}`}>
            {week.map((date) => {
              return (
                <CalendarCell
                  key={dayjs(date).format("YYYYMMDD")}
                  date={date}
                  diary={diaries.find(
                    (diary) =>
                      diary.target_date === dayjs(date).format("YYYY-MM-DD")
                  )}
                  selected={
                    dayjs(selectedDate).format("YYYYMMDD") ===
                    dayjs(date).format("YYYYMMDD")
                  }
                  borderRight={dayjs(date).get("d") == 6}
                  onClick={(date) => setSelectedDate(date)}
                />
              );
            })}
          </div>
        );
      })}
      {/* ボタングループ */}
      <div className="flex flex-row flex-nowrap justify-between mt-4">
        <div className="w-1/4">
          <Button
            options={{
              type: "button",
              onClick: () => {
                setSelectedDate(dayjs(selectedDate).subtract(1, "M").toDate());
              },
            }}
            label="前月"
          />
        </div>
        <div className="w-1/4">
          <Button
            options={{
              type: "button",
              onClick: () => {
                setSelectedDate(dayjs().toDate());
              },
            }}
            label="当日"
          />
        </div>
        <div className="w-1/4">
          <Button
            options={{
              type: "button",
              onClick: () => {
                setSelectedDate(dayjs(selectedDate).add(1, "M").toDate());
              },
            }}
            label="来月"
          />
        </div>
      </div>
    </div>
  );
}
