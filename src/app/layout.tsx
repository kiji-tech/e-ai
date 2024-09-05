import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SupabaseListener from "@/components/(server)/supabase.listener";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "E-AI",
    description: "English AI Diary Application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ja">
            <body className={inter.className}>
                <SupabaseListener />
                <div className="flex flex-col h-[calc(100vh-68px)]">
                    <main className="flex-1 container max-w-screen-3xl  mx-auto px-1 pt-5 max-h-[100%-96px]">
                        {children}
                    </main>
                    {/* <footer className="py-4 text-sm text-center bg-gray-300 h-20 fixed bottom-0 w-full">
                        Copyright © 2024 All rights reserved | LibeTech
                    </footer> */}
                </div>
            </body>
        </html>
    );
}
