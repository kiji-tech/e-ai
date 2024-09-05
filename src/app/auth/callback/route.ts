import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    console.log("===================== callback ============================");
    const supabase = createRouteHandlerClient({ cookies });
    const requestUrl = new URL(request.url);
    // 認証コードの取得
    const code = requestUrl.searchParams.get("code");
    if (code) {
        // 認証コードを使ってアクセストークンを取得
        const {
            data: { user },
            error,
        } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
            console.error(error);
        }
        if (!user) {
            throw new Error("user is null");
        }
        // user情報の取得
        const { data: appUser, error: appUserError } = await supabase
            .from("users")
            .select("*")
            .eq("uid", user.id)
            .maybeSingle();
        console.log({ appUser, appUserError });
        if (!appUser) {
            const { error: insertdError } = await supabase!.from("users").insert([
                {
                    uid: user.id,
                    email: user.email,
                    name: "",
                    role: "User",
                    member_ship: "Free",
                    delete_flag: false,
                    updated_at: null,
                    stripe_id: null,
                },
            ]);
            console.error(insertdError);
        }
    }

    return NextResponse.redirect(requestUrl.origin);
}
