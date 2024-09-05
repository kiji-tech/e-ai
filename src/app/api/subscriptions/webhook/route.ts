import { withDB } from "@/lib/wrapper/with.db";
import { SupabaseClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const endpointSecret = "whsec_86265d007d14491abd5b6cb276c4ba1caaf699d191b01e807054d0467f733edd";

const createSubscription = async (
    client: SupabaseClient,
    subscription: Stripe.Subscription & { plan: Stripe.Plan }
) => {
    console.log("===================== Create Subscription ============================");
    // customerId
    const {
        id,
        customer,
        status,
        created,
        current_period_start,
        current_period_end,
        cancel_at,
        items,
        cancel_at_period_end,
        canceled_at,
    } = subscription;

    const user = await client.from("users").select("*").eq("stripe_id", customer).single();
    if (!user || user.error) {
        console.error(`user not found : ${id} ${customer}`);
        return;
    }
    // subscriptionの登録
    const insertSubscription = await client.from("subscriptions").upsert(
        [
            {
                uid: id,
                created_at: new Date(created * 1000),
                updated_at: new Date(),
                user_id: user.data.uid,
                status,
                current_period_end: new Date(current_period_end * 1000),
                current_period_start: new Date(current_period_start * 1000),
                cancel_at: cancel_at ? new Date(cancel_at * 1000) : null,
            },
        ],
        { onConflict: "uid" }
    );
    console.log(insertSubscription);

    // itemsから消えているIDはend_atを設定
    const itemsIDs = items.data.map((item) => item.id);
    console.log({ itemsIDs });
    const deleteAt = await client
        .from("subscription_items")
        .update({ end_at: new Date() })
        .eq("subscription_id", id)
        .not("uid", "in", `(${itemsIDs.join(",")})`);
    console.log({ deleteAt });

    // subscription itemの登録
    const insertItem = await client.from("subscription_items").upsert(
        items.data.map((item) => ({
            uid: item.id,
            subscription_id: id,
            price_id: item.price.id,
            quantity: item.quantity,
            created_at: new Date(item.created * 1000),
            updated_at: new Date(),
        })),
        { onConflict: "uid" }
    );
    console.log(insertItem);
};

const handler = async (req: NextRequest, supabase: SupabaseClient) => {
    const sig = headers().get("stripe-signature")!;

    let event: Stripe.Event;
    const body = await req.text();
    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (e: any) {
        console.error(e);
        return new NextResponse(`Webhook Error: ${e.message}`, { status: 400 });
    }

    // Handle the event
    console.log(`event type ${event.type}`);

    switch (event.type) {
        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
            const subscriptionCreated = event.data.object;
            // Then define and call a function to handle the event customer.subscription.created
            console.log(JSON.stringify(subscriptionCreated));
            await createSubscription(
                supabase,
                subscriptionCreated as Stripe.Subscription & { plan: Stripe.Plan }
            );
            break;
        default:
            console.log(`Unhandled event`);
    }
    return new NextResponse("success", { status: 200 });
};

export const POST = withDB(handler);
