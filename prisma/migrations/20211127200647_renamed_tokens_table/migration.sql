/*
  Warnings:

  - You are about to drop the `refresh_tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "refresh_tokens";

-- CreateTable
CREATE TABLE "tokens" (
    "token_id" UUID NOT NULL,
    "token" VARCHAR(500) NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("token_id")
);
