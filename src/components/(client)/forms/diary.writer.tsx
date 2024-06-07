"use client";
import { z } from "zod";
import Textarea from "./textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./button";
import { useEffect, useState } from "react";
import { Tables } from "@/lib/database.types";

type Props = {
  diary: Tables<"diaries">;
  isLoading: boolean;
  onSubmit: (diary: Tables<"diaries">) => void;
};
const DiaryWriter = ({
  diary = {} as Tables<"diaries">,
  isLoading = false,
}: Props) => {
  return (
    <>
    </>
  );
};
export default DiaryWriter;
