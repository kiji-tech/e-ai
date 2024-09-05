"use client";
import { Tables } from "@/lib/database.types";
import { useState } from "react";

type Props = {
    corrections: Tables<"corrections">[];
};
export default function Chats({ corrections }: Props) {
    const [isModal, setIsModal] = useState(false);
    const [selectedCorrection, setSelectedCorrection] = useState<Tables<"corrections"> | null>(
        null
    );

    const popup = (c: Tables<"corrections">) => {
        setIsModal(true);
        setSelectedCorrection(c);
    };

    return (
        <>
            <div className=" overflow-y-auto h-full w-full bg-slate-500 p-4 mb-4 rounded-md">
                {/* ヘッダー */}
                {/* 日付 */}
                {/* チャット */}
                {corrections &&
                    corrections.map((c) => {
                        return (
                            <>
                                <div>
                                    <button
                                        onClick={() => popup(c)}
                                        className="bg-blue-300 text-left py-2 px-4 max-w-[80%] rounded-lg inline-block text-md mb-4"
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
                                        onClick={() => popup(c)}
                                        className="bg-white text-left py-2 px-4 max-w-[80%] rounded-lg inline-block text-md mb-4 float-end"
                                    >
                                        {c.comment_en}
                                    </button>
                                </div>
                            </>
                        );
                    })}
            </div>
            {isModal && selectedCorrection && (
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

                                {/*
                                        <div>{correction.comment_en}</div>
                                        <div>{correction.comment_ja}</div>
                                        <div className="text-lg">{correction.score}</div>
                                        <div>{correction.points}</div>
                                         */}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
