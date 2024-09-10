"use client";
import { Tables } from "@/lib/database.types";
import { createRef, useEffect, useState } from "react";
import { set } from "zod";

type Props = {
    corrections: Tables<"corrections">[];
    chatref: React.RefObject<HTMLDivElement>;
};
export default function Chats({ corrections, chatref }: Props) {
    const [isModal, setIsModal] = useState(false);
    const [selectedCorrection, setSelectedCorrection] = useState<Tables<"corrections"> | null>(
        null
    );
    const [selectedMode, setSelectedMode] = useState<"user" | "assistant">("user");

    const popup = (c: Tables<"corrections">, mode: "user" | "assistant") => {
        setIsModal(true);
        setSelectedCorrection(c);
        setSelectedMode(mode);
    };
    return (
        <>
            <div className="h-[calc(100vh-320px)] w-full bg-slate-500 p-4 mb-4 rounded-md">
                {/* ヘッダー */}
                {/* 日付 */}
                {/* チャット */}
                <div className="h-[100%] overflow-y-auto">
                    {corrections &&
                        corrections.map((c) => {
                            return (
                                <div key={c.uid}>
                                    <div>
                                        <button
                                            onClick={() => popup(c, "user")}
                                            className="bg-blue-300 text-left py-2 px-4 max-w-[80%] rounded-lg inline-block text-md mb-4 float-end"
                                        >
                                            <div>{c.result_en}</div>
                                            <div className="text-gray-600 text-sm ml-4">
                                                You → {c.en}
                                            </div>
                                            {/* クリックしたら詳細を右に表示? */}
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => popup(c, "assistant")}
                                            className="bg-white text-left py-2 px-4 max-w-[80%] rounded-lg inline-block text-md mb-4"
                                        >
                                            {c.comment_en}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    <div ref={chatref}></div>
                </div>
            </div>
            {isModal && selectedMode == "user" && selectedCorrection && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50"
                        onClick={() => setIsModal(false)}
                    ></div>
                    <div className="fixed top-1/2 left-1/2 w-[80%] min-w-[360px]  transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md">
                        <div>
                            {/* ヘッダー */}
                            <div className="bg-gray-500 w-full rounded-t-md px-4 py-2">
                                <div className="text-sm text-white">{selectedCorrection.ja}</div>
                            </div>
                            {/* コンテナ */}
                            <div className="bg-white rounded-b-md p-4">
                                <div className="text-2xl">{selectedCorrection.result_en}</div>
                                <div className="text-sm text-gray-500 ml-10 mb-4">
                                    {selectedCorrection.en}
                                </div>
                                <div className="text-md">{selectedCorrection.result_ja}</div>
                                

                            </div>
                        </div>
                    </div>
                </>
            )}
            {isModal && selectedMode == "assistant" && selectedCorrection && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50"
                        onClick={() => setIsModal(false)}
                    ></div>
                    <div className="fixed top-1/2 left-1/2 w-[80%] min-w-[360px]  transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md">
                        <div>
                            {/* ヘッダー */}
                            <div className="bg-gray-500 w-full rounded-t-md px-4 py-2">
                                <div className="text-sm text-white">
                                    {selectedCorrection.comment_ja}
                                </div>
                            </div>
                            {/* コンテナ */}
                            <div className="bg-white rounded-b-md p-4">
                                <div className="text-2xl">{selectedCorrection.comment_en}</div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
