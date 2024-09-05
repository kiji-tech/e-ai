"use client";
import { Tables } from "@/lib/database.types";

type Props = {
    diary: Tables<"diaries">;
    isLoading: boolean;
    onSubmit: (diary: Tables<"diaries">) => void;
};
const DiaryWriter = ({ diary = {} as Tables<"diaries">, isLoading = false }: Props) => {
    return <></>;
};
export default DiaryWriter;
