
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."MemberShip" AS ENUM (
    'Free',
    'Prime'
);

ALTER TYPE "public"."MemberShip" OWNER TO "postgres";

CREATE TYPE "public"."Role" AS ENUM (
    'User',
    'Admin'
);

ALTER TYPE "public"."Role" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."corrections" (
    "uid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "diary_id" "uuid" NOT NULL,
    "ja" "text",
    "en" "text",
    "result_ja" "text",
    "result_en" "text",
    "comment_ja" "text",
    "comment_en" "text",
    "points" "text",
    "score" smallint,
    "delete_flag" boolean
);

ALTER TABLE "public"."corrections" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."diaries" (
    "uid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "target_date" "date",
    "user_id" "uuid" NOT NULL,
    "ja" "text",
    "en" "text",
    "delete_flag" boolean DEFAULT false
);

ALTER TABLE "public"."diaries" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."subscription_plans" (
    "uid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text",
    "price" integer,
    "property_limit" integer,
    "image_per_Property_limit" integer,
    "features" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."subscription_plans" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."subscriptions" (
    "uid" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "canceled" boolean DEFAULT false,
    "quantity" bigint DEFAULT '1'::bigint,
    "current_period_start" timestamp with time zone,
    "current_period_end" timestamp with time zone,
    "cancel_at" timestamp with time zone,
    "price_id" "text",
    "user_id" "uuid" DEFAULT "auth"."uid"()
);

ALTER TABLE "public"."subscriptions" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."users" (
    "uid" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "email" "text" NOT NULL,
    "name" "text",
    "role" "public"."Role" DEFAULT 'User'::"public"."Role",
    "member_ship" "public"."MemberShip" DEFAULT 'Free'::"public"."MemberShip",
    "delete_flag" boolean DEFAULT false,
    "stripe_id" "text" NOT NULL
);

ALTER TABLE "public"."users" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."word" (
    "uid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "diary_id" "uuid" NOT NULL,
    "word" "text",
    "mean" "text",
    "delete_flag" boolean
);

ALTER TABLE "public"."word" OWNER TO "postgres";

ALTER TABLE ONLY "public"."corrections"
    ADD CONSTRAINT "corrections_pkey" PRIMARY KEY ("uid");

ALTER TABLE ONLY "public"."diaries"
    ADD CONSTRAINT "dialies_pkey" PRIMARY KEY ("uid");

ALTER TABLE ONLY "public"."subscription_plans"
    ADD CONSTRAINT "subscription_plans_pkey" PRIMARY KEY ("uid");

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("uid");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("uid");

ALTER TABLE ONLY "public"."word"
    ADD CONSTRAINT "word_pkey" PRIMARY KEY ("uid");

ALTER TABLE ONLY "public"."corrections"
    ADD CONSTRAINT "corrections_diary_id_fkey" FOREIGN KEY ("diary_id") REFERENCES "public"."diaries"("uid") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."diaries"
    ADD CONSTRAINT "dialies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("uid") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("uid");

ALTER TABLE ONLY "public"."word"
    ADD CONSTRAINT "word_diary_id_fkey" FOREIGN KEY ("diary_id") REFERENCES "public"."diaries"("uid") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "public"."corrections" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "corrections.all.policy" ON "public"."corrections" USING (true);

ALTER TABLE "public"."diaries" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "diaries.all.policy" ON "public"."diaries" USING (true);

ALTER TABLE "public"."subscription_plans" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."subscriptions" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users.policy.all" ON "public"."users" USING (true);

ALTER TABLE "public"."word" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "word.all.policy" ON "public"."word" USING (true);

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."corrections" TO "anon";
GRANT ALL ON TABLE "public"."corrections" TO "authenticated";
GRANT ALL ON TABLE "public"."corrections" TO "service_role";

GRANT ALL ON TABLE "public"."diaries" TO "anon";
GRANT ALL ON TABLE "public"."diaries" TO "authenticated";
GRANT ALL ON TABLE "public"."diaries" TO "service_role";

GRANT ALL ON TABLE "public"."subscription_plans" TO "anon";
GRANT ALL ON TABLE "public"."subscription_plans" TO "authenticated";
GRANT ALL ON TABLE "public"."subscription_plans" TO "service_role";

GRANT ALL ON TABLE "public"."subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."subscriptions" TO "service_role";

GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";

GRANT ALL ON TABLE "public"."word" TO "anon";
GRANT ALL ON TABLE "public"."word" TO "authenticated";
GRANT ALL ON TABLE "public"."word" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
