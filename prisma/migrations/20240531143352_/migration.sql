-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin');

-- CreateEnum
CREATE TYPE "MemberShip" AS ENUM ('Free', 'Prime');

-- CreateTable
CREATE TABLE "users" (
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'User',
    "member_ship" "MemberShip" NOT NULL DEFAULT 'Free',
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "diaries" (
    "uid" TEXT NOT NULL,
    "target_date" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "ja" TEXT,
    "en" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "diaries_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "corrections" (
    "uid" TEXT NOT NULL,
    "diary_id" TEXT NOT NULL,
    "ja" TEXT,
    "en" TEXT,
    "result_ja" TEXT,
    "result_en" TEXT,
    "comment_ja" TEXT,
    "comment_en" TEXT,
    "points" TEXT,
    "score" INTEGER,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "corrections_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "words" (
    "uid" TEXT NOT NULL,
    "diary_id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "mean" TEXT NOT NULL,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "words_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "diaries_target_date_user_id_key" ON "diaries"("target_date", "user_id");

-- AddForeignKey
ALTER TABLE "diaries" ADD CONSTRAINT "diaries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "corrections" ADD CONSTRAINT "corrections_diary_id_fkey" FOREIGN KEY ("diary_id") REFERENCES "diaries"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "words" ADD CONSTRAINT "words_diary_id_fkey" FOREIGN KEY ("diary_id") REFERENCES "diaries"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
