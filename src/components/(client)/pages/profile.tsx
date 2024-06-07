"use client";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { Button } from "@/components/(client)/forms";
import useStore from "@/store";
import { FormEvent, useState } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useStore();

  const handleSignOut = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("ログアウトに失敗しました", error);
        return;
      }
      router.push("/");
    } catch (e) {
      if (e) {
        console.error("ログアウトに失敗しました", e);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <h3>Profile Page</h3>
      <form onSubmit={handleSignOut}>
        <Button
          label="ログアウト"
          options={{
            type: "submit",
            disabled: isLoading,
          }}
        />
      </form>
    </>
  );
};
export default ProfilePage;
