create table "public"."subscription_items" (
    "uid" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now(),
    "quantity" bigint default '0'::bigint,
    "price_id" text,
    "subscription_id" text
);


alter table "public"."subscription_items" enable row level security;

alter table "public"."subscriptions" drop column "price_id";

alter table "public"."subscriptions" add column "status" text;

CREATE UNIQUE INDEX subscription_items_pkey ON public.subscription_items USING btree (uid);

alter table "public"."subscription_items" add constraint "subscription_items_pkey" PRIMARY KEY using index "subscription_items_pkey";

alter table "public"."subscription_items" add constraint "subscription_items_subscription_id_fkey" FOREIGN KEY (subscription_id) REFERENCES subscriptions(uid) not valid;

alter table "public"."subscription_items" validate constraint "subscription_items_subscription_id_fkey";

grant delete on table "public"."subscription_items" to "anon";

grant insert on table "public"."subscription_items" to "anon";

grant references on table "public"."subscription_items" to "anon";

grant select on table "public"."subscription_items" to "anon";

grant trigger on table "public"."subscription_items" to "anon";

grant truncate on table "public"."subscription_items" to "anon";

grant update on table "public"."subscription_items" to "anon";

grant delete on table "public"."subscription_items" to "authenticated";

grant insert on table "public"."subscription_items" to "authenticated";

grant references on table "public"."subscription_items" to "authenticated";

grant select on table "public"."subscription_items" to "authenticated";

grant trigger on table "public"."subscription_items" to "authenticated";

grant truncate on table "public"."subscription_items" to "authenticated";

grant update on table "public"."subscription_items" to "authenticated";

grant delete on table "public"."subscription_items" to "service_role";

grant insert on table "public"."subscription_items" to "service_role";

grant references on table "public"."subscription_items" to "service_role";

grant select on table "public"."subscription_items" to "service_role";

grant trigger on table "public"."subscription_items" to "service_role";

grant truncate on table "public"."subscription_items" to "service_role";

grant update on table "public"."subscription_items" to "service_role";


