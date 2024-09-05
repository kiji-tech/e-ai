import Navigation from "../(client)/navigation";
import { supabase } from "@/lib/server.side.utili";

const SupabaseListener = async () => {
    const {
        data: { session },
    } = await supabase.auth.getSession();

    let user = null;
    if (session) {
        const { data: currentUser } = await supabase
            .from("users")
            .select("*")
            .eq("uid", session.user.id)
            .maybeSingle();
        user = currentUser;
        if (user && user.email == session.user.email) {
            const { data: updateUser } = await supabase
                .from("users")
                .update({ email: session.user.email })
                .eq("uid", session.user.id)
                .select("*")
                .single();
            user = updateUser;
        }
    }
    return <Navigation session={session} user={user} />;
};
export default SupabaseListener;
