/*
  Warnings:

  - You are about to drop the `_coachesTopreferences` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_preferencesTosports` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_coachesTopreferences" DROP CONSTRAINT "_coachesTopreferences_A_fkey";

-- DropForeignKey
ALTER TABLE "_coachesTopreferences" DROP CONSTRAINT "_coachesTopreferences_B_fkey";

-- DropForeignKey
ALTER TABLE "_preferencesTosports" DROP CONSTRAINT "_preferencesTosports_A_fkey";

-- DropForeignKey
ALTER TABLE "_preferencesTosports" DROP CONSTRAINT "_preferencesTosports_B_fkey";

-- DropTable
DROP TABLE "_coachesTopreferences";

-- DropTable
DROP TABLE "_preferencesTosports";

-- CreateTable
CREATE TABLE "coaches_preferences" (
    "coaches_preferences_id" UUID NOT NULL,
    "coach_id" UUID NOT NULL,
    "preference_id" UUID NOT NULL,

    CONSTRAINT "coaches_preferences_pkey" PRIMARY KEY ("coaches_preferences_id")
);

-- CreateTable
CREATE TABLE "sports_preferences" (
    "sports_preferences_id" UUID NOT NULL,
    "sport_id" UUID NOT NULL,
    "preference_id" UUID NOT NULL,

    CONSTRAINT "sports_preferences_pkey" PRIMARY KEY ("sports_preferences_id")
);

-- AddForeignKey
ALTER TABLE "coaches_preferences" ADD CONSTRAINT "coaches_preferences_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coaches"("coach_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coaches_preferences" ADD CONSTRAINT "coaches_preferences_preference_id_fkey" FOREIGN KEY ("preference_id") REFERENCES "preferences"("preference_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sports_preferences" ADD CONSTRAINT "sports_preferences_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "sports"("sport_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sports_preferences" ADD CONSTRAINT "sports_preferences_preference_id_fkey" FOREIGN KEY ("preference_id") REFERENCES "preferences"("preference_id") ON DELETE RESTRICT ON UPDATE CASCADE;
