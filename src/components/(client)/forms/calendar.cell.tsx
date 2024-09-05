"use client";

import dayjs from "dayjs";
import { Tables } from "@/lib/database.types";
import { FaCalendar } from "react-icons/fa";

type Props = {
    date: Date | null;
    corrections: Tables<"corrections">[];
    selected: boolean;
    borderRight: boolean;
    onClick: (date: Date) => void;
};

export default function CalendarCell({
    date,
    corrections,
    selected = false,
    borderRight = false,
    onClick = (date: Date) => {},
}: Props) {
    return (
        <div
            className={`py-4 px-4 border-t border-b border-l h-16 w-40 relative  
          ${selected && "bg-sky-200"}
       ${borderRight && "border-r"} cursor-pointer hover:bg-sky-100`}
            onClick={() => onClick(dayjs(date).toDate())}
        >
            <div className="absolute top-2 left-2 text-lg">{dayjs(date).format("D")}</div>
            {corrections.length > 0 && (
                <div className="absolute bottom-2 left-2 text-md">
                    <FaCalendar />
                </div>
            )}
        </div>
    );
}
