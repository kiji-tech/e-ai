import { createServerComponentClient, SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getSupabaseClient = () => {
    return createServerComponentClient({ cookies });
};

export const checkSession = async (supabase: SupabaseClient) => {
    const {
        data: { session },
    } = await supabase.auth.getSession();
    return session ? true : false;
};
