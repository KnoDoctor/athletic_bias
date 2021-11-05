-- CreateTable
CREATE TABLE "sports_preferences" (
    "sports_preferences_id" UUID NOT NULL,
    "sport_id" UUID NOT NULL,
    "preference_id" UUID NOT NULL,

    CONSTRAINT "sports_preferences_pkey" PRIMARY KEY ("sports_preferences_id")
);

-- AddForeignKey
ALTER TABLE "sports_preferences" ADD CONSTRAINT "sports_preferences_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "sports"("sport_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sports_preferences" ADD CONSTRAINT "sports_preferences_preference_id_fkey" FOREIGN KEY ("preference_id") REFERENCES "preferences"("preference_id") ON DELETE RESTRICT ON UPDATE CASCADE;
