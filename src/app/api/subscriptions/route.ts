import { Tables } from "@/lib/database.types";
import { stripe } from "@/lib/stripe";
import { withUser } from "@/lib/wrapper/with.user";
import { User, SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, user: User, supabase: SupabaseClient) => {
    const {
        data: { stripe_id },
        error,
    } = await supabase.from("users").select("*").eq("uid", user.id).single();
    if (error || !stripe_id) {
        throw new Error("stripe_id is null");
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price: process.env.NEXT_PUBLIC_MONTHLY_PRICE_ID!,
                quantity: 1,
            },
        ],
        mode: "subscription",
        customer: stripe_id,
        success_url: `${process.env.SYSTEM_ORIGIN}/diaries`,
        cancel_url: `${process.env.SYSTEM_ORIGIN}/profile`,
    });
    return new NextResponse(
        JSON.stringify({
            checkout_url: session.url,
        }),
        { status: 200 }
    );
};
export const POST = withUser(handler);
