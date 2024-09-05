"use client";

import { Database } from "@/lib/database.types";
import { Session } from "@supabase/supabase-js";
import { useEffect } from "react";
import Link from "next/link";
type User = Database["public"]["Tables"]["users"]["Row"];
import useStore from "@/store";

type Props = {
    session: Session | null;
    user: User | null;
};
const Navigation = ({ session, user }: Props) => {
    const { setUser } = useStore();

    // Userの更新
    useEffect(() => {
        setUser({
            uid: session ? session.user.id : "",
            email: session ? session.user.email! : "",
            name: session && user ? user.name : "",
            role: session && user ? user.role : "User",
            member_ship: session && user ? user.member_ship : "Free",
            delete_flag: session && user ? user.delete_flag : false,
            created_at: session && user ? user.created_at : "",
            updated_at: session && user ? user.updated_at : "",
            stripe_id: "",
        });
    }, [session, setUser, user]);

    return (
        <header className="shadow-lg shadow-gray-500">
            <div className="py-5 container max-w-screen-xl mx-auto flex items-center justify-between">
                <Link href="/diaries" className="font-bold text-xl cursor-pointer">
                    Home
                </Link>
                <div className="text-sm font-bold">
                    <div className="flex item-center space-x-5">
                        {session ? (
                            <>
                                <Link href="/diaries">
                                    <div>日記</div>
                                </Link>
                                <Link href="/profile">
                                    <div>プロフィール</div>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/signin">
                                    <div>ログイン</div>
                                </Link>
                                <Link href="/auth/signup">
                                    <div>サインアップ</div>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Navigation;
