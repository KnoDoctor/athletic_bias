/*
  Warnings:

  - Added the required column `parent_id` to the `tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "expiry_date" DATE,
ADD COLUMN     "parent_id" UUID NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL;
