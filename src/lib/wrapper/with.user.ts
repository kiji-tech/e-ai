import { InvalidRequest } from "@/app/api/(error)";
import { enableCors } from "./cors";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { get } from "http";
import { getSupabaseClient } from "../ssr.side.util";

export const withUser = (
    handler: (req: NextRequest, user: User, supabase: SupabaseClient) => Promise<Response>
) => {
    return async (req: NextRequest) => {
        const supabase = getSupabaseClient();
        const res = new NextResponse();
        enableCors(req, res);
        // セッションを取得
        const {
            data: { session },
        } = await supabase.auth.getSession();

        // 個別のハンドラを実行
        try {
            const handlerResponse = await handler(req, session?.user!, supabase);
            return new Response(handlerResponse.body, {
                status: handlerResponse.status,
                headers: res.headers,
            });
        } catch (e) {
            console.error(e);

            if (e instanceof InvalidRequest) {
                return new Response(e.message, {
                    status: e.status,
                    headers: res.headers,
                });
            }
            return new Response("Internal Server Error", {
                status: 500,
                headers: res.headers,
            });
        }
    };
};
