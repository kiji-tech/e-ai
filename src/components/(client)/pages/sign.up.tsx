"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../forms";
import Link from "next/link";
import { supabase } from "@/lib/client.side.util";
const schema = z.object({
    email: z.string().email("メール・アドレスの形式が正しくありません"),
    password: z.string().min(6, "パスワードは6文字以上で入力してください"),
    password2: z.string().min(6, "パスワードは6文字以上で入力してください"),
});
type Schema = z.infer<typeof schema>;

const signUp = async (email: string, password: string) => {
    const res = await fetch("/api/auth/signup", {
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
    });
    const data = await res.json();
    console.log(data);
};

const SignUpPage = () => {
    console.log(process.env.NEXT_PUBLIC_CALLBACK_URL);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Schema>({
        defaultValues: { email: "", password: "" },
        resolver: zodResolver(schema),
    });

    const onSubmit = async (schema: Schema) => {
        if (schema.password !== schema.password2) {
            setMessage(`パスワードが異なります`);
            return;
        }

        setIsLoading(true);
        try {
            await signUp(schema.email, schema.password);
            reset();
            setMessage(`登録完了しました。メールを確認してください。`);
        } catch (e) {
            setMessage(`エラーが発生しました: ${e}`);
        } finally {
            setIsLoading(false);
            router.refresh();
        }
    };

    return (
        <div className="max-w-[400px] max-w-auto">
            <div className="text-center font-bold text-xl mb-10">ログイン</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <div className="mb-3">
                        <Input
                            id="email"
                            type="email"
                            placeholder="メールアドレス"
                            options={{
                                ...register("email", { required: true }),
                            }}
                            message={errors.email?.message || undefined}
                        />
                    </div>
                    <div className="mb-3">
                        <Input
                            id="password"
                            type="password"
                            placeholder="パスワード"
                            options={{
                                ...register("password", { required: true }),
                            }}
                            message={errors.password?.message || undefined}
                        />
                    </div>
                    <div className="mb-3">
                        <Input
                            id="password2"
                            type="password"
                            placeholder="パスワード（確認）"
                            options={{
                                ...register("password2", { required: true }),
                            }}
                            message={errors.password2?.message || undefined}
                        />
                    </div>
                    <div className="mb-5">
                        <Button
                            options={{ type: "submit", disabled: isLoading }}
                            label="新規登録"
                        />
                    </div>
                </div>
                {message && <div className="text-red-500 text-sm my-5 text-center">{message}</div>}
                <div className="text-center text-sm mb-5">
                    <Link href="/auth/signin" className=" text-gray-500 font-bold">
                        ログインへ戻る
                    </Link>
                </div>
            </form>
            <Button
                options={{
                    type: "button",
                    disabled: isLoading,
                    onClick: () => {
                        supabase.auth.signInWithOAuth({
                            provider: "google",
                            options: {
                                queryParams: {
                                    access_type: "offline",
                                    prompt: "consent",
                                },
                                redirectTo: process.env.NEXT_PUBLIC_CALLBACK_URL,
                            },
                        });
                    },
                }}
                label="Google"
            ></Button>
        </div>
    );
};
export default SignUpPage;
