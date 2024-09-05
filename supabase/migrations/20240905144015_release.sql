revoke delete on table "public"."subscription_plans" from "anon";

revoke insert on table "public"."subscription_plans" from "anon";

revoke references on table "public"."subscription_plans" from "anon";

revoke select on table "public"."subscription_plans" from "anon";

revoke trigger on table "public"."subscription_plans" from "anon";

revoke truncate on table "public"."subscription_plans" from "anon";

revoke update on table "public"."subscription_plans" from "anon";

revoke delete on table "public"."subscription_plans" from "authenticated";

revoke insert on table "public"."subscription_plans" from "authenticated";

revoke references on table "public"."subscription_plans" from "authenticated";

revoke select on table "public"."subscription_plans" from "authenticated";

revoke trigger on table "public"."subscription_plans" from "authenticated";

revoke truncate on table "public"."subscription_plans" from "authenticated";

revoke update on table "public"."subscription_plans" from "authenticated";

revoke delete on table "public"."subscription_plans" from "service_role";

revoke insert on table "public"."subscription_plans" from "service_role";

revoke references on table "public"."subscription_plans" from "service_role";

revoke select on table "public"."subscription_plans" from "service_role";

revoke trigger on table "public"."subscription_plans" from "service_role";

revoke truncate on table "public"."subscription_plans" from "service_role";

revoke update on table "public"."subscription_plans" from "service_role";

alter table "public"."corrections" drop constraint "corrections_diary_id_fkey";

alter table "public"."word" drop constraint "word_diary_id_fkey";

alter table "public"."subscription_plans" drop constraint "subscription_plans_pkey";

drop index if exists "public"."subscription_plans_pkey";

drop table "public"."subscription_plans";

alter table "public"."corrections" drop column "diary_id";

alter table "public"."corrections" add column "target_date" date;

alter table "public"."corrections" add column "user_id" uuid;

alter table "public"."subscription_items" add column "end_at" timestamp with time zone;

alter table "public"."word" drop column "diary_id";

alter table "public"."word" add column "target_date" date;

alter table "public"."word" add column "user_id" uuid;

alter table "public"."corrections" add constraint "corrections_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(uid) not valid;

alter table "public"."corrections" validate constraint "corrections_user_id_fkey";

alter table "public"."word" add constraint "word_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(uid) not valid;

alter table "public"."word" validate constraint "word_user_id_fkey";

create policy "subscription_items.policy"
on "public"."subscription_items"
as permissive
for all
to public
using (true);


create policy "subscriptions.all.policy"
on "public"."subscriptions"
as permissive
for all
to public
using (true);



