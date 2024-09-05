"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../forms";
import { supabase } from "@/lib/client.side.util";

const schema = z.object({
    email: z.string().email("メール・アドレスの形式が正しくありません"),
    password: z.string().min(6, "パスワードは6文字以上で入力してください"),
});
type Schema = z.infer<typeof schema>;

const signIn = async (email: string, password: string) => {
    const {
        data: { user },
        error,
    } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;
};

const SignInPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Schema>({
        defaultValues: { email: "", password: "" },
        resolver: zodResolver(schema),
    });

    const onSubmit = async (schema: Schema) => {
        setIsLoading(true);
        try {
            await signIn(schema.email, schema.password);

            router.push("/");
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
                <div className="mb-5">
                    <Button options={{ type: "submit", disabled: isLoading }} label="ログイン" />
                </div>
                {message && <div className="text-red-500 text-sm my-5 text-center">{message}</div>}
                <div className="text-center text-sm mb-5">
                    <Link href="/auth/reset-password" className=" text-gray-500 font-bold">
                        パスワードを忘れた場合
                    </Link>
                </div>
                <div className="text-center text-sm mb-5">
                    <Link href="/auth/signup" className=" text-gray-500 font-bold">
                        新しいアカウントを作成する
                    </Link>
                </div>
            </form>
        </div>
    );
};
export default SignInPage;
