"use client";

import { useEffect, useState } from "react";
import CalendarCell from "./calendar.cell";
import Button from "./button";
import dayjs from "dayjs";
import { Database, Tables } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CalendarUtil } from "@/lib/calendar.util";
import { useRouter } from "next/navigation";
const supabase = createClientComponentClient<Database>();

type Props = {
    selectedDate?: Date;
    corrections: Tables<"corrections">[];
};
export default function Calendar({ selectedDate = new Date(), corrections = [] }: Props) {
    const [dateList, setDateList] = useState<Date[][]>([]);
    const router = useRouter();

    const changeSelectedDate = (date: Date) => {
        router.push(`/diaries/${dayjs(date).format("YYYY-MM-DD")}`);
    };

    useEffect(() => {
        setDateList(CalendarUtil.createCalendar(selectedDate));
    }, []);
    return (
        <div className="flex flex-col justify-start text-center">
            <div>{dayjs(selectedDate).format("YYYY年MM月")}</div>
            {/* カレンダー（曜日） */}
            <div className="flex flex-row justify-center  text-center">
                <div className="py-2 px-4 border-t border-b border-l border-r w-40">日</div>
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
                                    corrections={corrections.filter(
                                        (correction) =>
                                            correction.target_date ===
                                            dayjs(date).format("YYYY-MM-DD")
                                    )}
                                    selected={
                                        dayjs(selectedDate).format("YYYYMMDD") ===
                                        dayjs(date).format("YYYYMMDD")
                                    }
                                    borderRight={dayjs(date).get("d") == 6}
                                    onClick={(date) => changeSelectedDate(date)}
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
                                changeSelectedDate(dayjs(selectedDate).subtract(1, "M").toDate());
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
                                changeSelectedDate(dayjs().toDate());
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
                                changeSelectedDate(dayjs(selectedDate).add(1, "M").toDate());
                            },
                        }}
                        label="来月"
                    />
                </div>
            </div>
        </div>
    );
}
