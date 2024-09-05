import { InvalidRequest } from "@/app/api/(error)";
import { getSupabaseClient } from "../server.side.utili";
import { enableCors } from "./cors";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const withDB = (
    handler: (req: NextRequest, supabase: SupabaseClient) => Promise<Response>
) => {
    return async (req: NextRequest) => {
        const supabase = getSupabaseClient();
        const res = new NextResponse();
        enableCors(req, res);
        // 個別のハンドラを実行
        try {
            const handlerResponse = await handler(req, supabase);
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
