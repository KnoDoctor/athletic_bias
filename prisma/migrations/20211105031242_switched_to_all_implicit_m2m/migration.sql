/*
  Warnings:

  - You are about to drop the `sports_preferences` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sports_preferences" DROP CONSTRAINT "sports_preferences_preference_id_fkey";

-- DropForeignKey
ALTER TABLE "sports_preferences" DROP CONSTRAINT "sports_preferences_sport_id_fkey";

-- DropTable
DROP TABLE "sports_preferences";

-- CreateTable
CREATE TABLE "_preferencesTosports" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_preferencesTosports_AB_unique" ON "_preferencesTosports"("A", "B");

-- CreateIndex
CREATE INDEX "_preferencesTosports_B_index" ON "_preferencesTosports"("B");

-- AddForeignKey
ALTER TABLE "_preferencesTosports" ADD FOREIGN KEY ("A") REFERENCES "preferences"("preference_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_preferencesTosports" ADD FOREIGN KEY ("B") REFERENCES "sports"("sport_id") ON DELETE CASCADE ON UPDATE CASCADE;
