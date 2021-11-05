/*
  Warnings:

  - You are about to drop the `coaches_preferences` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "coaches_preferences" DROP CONSTRAINT "coaches_preferences_coach_id_fkey";

-- DropForeignKey
ALTER TABLE "coaches_preferences" DROP CONSTRAINT "coaches_preferences_preference_id_fkey";

-- DropTable
DROP TABLE "coaches_preferences";

-- CreateTable
CREATE TABLE "_coachesTopreferences" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_coachesTopreferences_AB_unique" ON "_coachesTopreferences"("A", "B");

-- CreateIndex
CREATE INDEX "_coachesTopreferences_B_index" ON "_coachesTopreferences"("B");

-- AddForeignKey
ALTER TABLE "_coachesTopreferences" ADD FOREIGN KEY ("A") REFERENCES "coaches"("coach_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_coachesTopreferences" ADD FOREIGN KEY ("B") REFERENCES "preferences"("preference_id") ON DELETE CASCADE ON UPDATE CASCADE;
