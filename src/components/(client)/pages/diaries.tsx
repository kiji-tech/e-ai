"use client";
import { Tables } from "@/lib/database.types";
import { Button, Input, Textarea } from "../forms";
import Calendar from "../forms/calendar";
import { useEffect, useState } from "react";
import { z } from "zod";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Chats from "../chats";

const diarySchema = z.object({
    ja: z.string(),
    en: z.string(),
});
type DiarySchema = z.infer<typeof diarySchema>;

type Props = {
    selectedDate: string;
    words: Tables<"word">[];
    corrections: Tables<"corrections">[];
};
export default function DiariesPage({ selectedDate, words, corrections }: Props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<DiarySchema>({
        defaultValues: { ja: "", en: "" },
        resolver: zodResolver(diarySchema),
    });

    const diaryHandler = async (schema: DiarySchema) => {
        setIsLoading(true);
        try {
            await fetch("/api/analyze", {
                body: JSON.stringify({
                    ...schema,
                    target_date: dayjs(selectedDate).format("YYYY-MM-DD"),
                }),
                // credentials: "include",
                headers: { "Content-Type": "application/json" },
                method: "POST",
            });
            reset();
            router.refresh();
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-row flex-wrap justify-between md:flex-nowrap">
            {/* カレンダー */}
            <div className="w-[calc(100%-32px)] m-4  md:w-[calc(50%-32px)]">
                <Calendar
                    selectedDate={dayjs(selectedDate).toDate()}
                    corrections={corrections || []}
                />
            </div>
            <div className="w-[calc(100%-32px)] m-4 max-h-[calc(100vh-860px)] md:w-[calc(50%-32px)] md:max-h-[calc(100vh-400px)] ">
                {/* チャット */}
                <Chats
                    corrections={corrections.filter(
                        (c) => dayjs(c.target_date).format("YYYY-MM-DD") == selectedDate
                    )}
                />
                {/* 日記入力 */}
                <form onSubmit={handleSubmit(diaryHandler)}>
                    <Input
                        placeholder={"日本語の日記"}
                        type="text"
                        id="ja"
                        options={{
                            ...register("ja", { required: true }),
                            disabled: isLoading,
                        }}
                        message={errors?.ja?.message}
                    />
                    <Input
                        placeholder={"英語の日記"}
                        type="text"
                        id="en"
                        options={{
                            ...register("en", { required: true }),
                            disabled: isLoading,
                        }}
                        message={errors?.en?.message}
                    />
                    <Button label="送信" options={{ type: "submit", disabled: isLoading }} />
                </form>
            </div>
        </div>
    );
}
