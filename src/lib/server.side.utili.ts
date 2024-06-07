import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const supabase = createServerComponentClient({ cookies });

export const checkSession = async () => {
    const {
        data: { session },
        } = await supabase.auth.getSession();
  return session ? true : false;
};
