import { stripe } from "@/lib/stripe";
import { withDB } from "@/lib/wrapper/with.db";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

const handler = async (req: NextRequest, supabase: SupabaseClient | undefined) => {
    //
    const { email, password } = await req.json();
    const customer = await stripe.customers.create({
        email: email,
        payment_method: "pm_card_visa",
        invoice_settings: {
            default_payment_method: "pm_card_visa",
        },
    });
    if (!customer) {
        throw new Error("customer is null");
    }
    const {
        data: { user },
        error,
    } = await supabase!.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: `${process.env.SYSTEM_ORIGIN}/auth/callback`,
        },
    });
    if (error) {
        throw new Error(error.message);
    }

    if (user != null && customer != null) {
        await supabase!.from("users").insert([
            {
                uid: user.id,
                email,
                name: "",
                role: "User",
                member_ship: "Free",
                delete_flag: false,
                updated_at: null,
                stripe_id: customer.id,
            },
        ]);
    }
    return new Response("success", { status: 200 });
};
export const POST = withDB(handler);
