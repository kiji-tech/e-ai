import type { Database } from "@/lib/database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    console.log("===================== callback ============================");
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const requestUrl = new URL(request.url);
    // 認証コードの取得
    const code = requestUrl.searchParams.get("code");
    if (code) {
        // 認証コードを使ってアクセストークンを取得
        await supabase.auth.exchangeCodeForSession(code);
    }
    return NextResponse.redirect(requestUrl.origin);
}
