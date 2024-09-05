import dayjs from "dayjs";

export class CalendarUtil {
    public static createCalendar = (selectedDate: Date) => {
        let result = [];
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
            result.push(week);
        }
        return result;
    };
}