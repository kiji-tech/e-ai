import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(request: NextRequest) {
    console.log("===================== callback ============================");
    const supabase = createRouteHandlerClient({ cookies });
    const requestUrl = new URL(request.url);
    // 認証コードの取得
    const code = requestUrl.searchParams.get("code");
    if (code) {
        // 認証コードを使ってアクセストークンを取得
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
            console.error(error);
        }
    }
    // user情報の取得
    const {
        data: { session },
    } = await supabase.auth.getSession();
    const user = session!.user;
    const customer = await stripe.customers.create({
        email: user.email,
        payment_method: "pm_card_visa",
        invoice_settings: {
            default_payment_method: "pm_card_visa",
        },
    });
    if (!customer) {
        throw new Error("customer is null");
    }

    if (user != null && customer != null) {
        await supabase!.from("users").insert([
            {
                uid: user.id,
                email: user.email,
                name: "",
                role: "User",
                member_ship: "Free",
                delete_flag: false,
                updated_at: null,
                stripe_id: customer.id,
            },
        ]);
    }

    return NextResponse.redirect(requestUrl.origin);
}
