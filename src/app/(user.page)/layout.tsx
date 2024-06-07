"use client";
import useStore from "@/store";
import { redirect } from "next/navigation";

export default function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
