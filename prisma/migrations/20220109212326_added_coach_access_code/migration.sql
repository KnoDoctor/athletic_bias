-- AlterTable
ALTER TABLE "coaches" ADD COLUMN     "access_code" VARCHAR(10);

-- CreateTable
CREATE TABLE "rugby_athletes" (
    "position" VARCHAR(100),
    "test_date" DATE,
    "date_of_birth" DATE,
    "height" DECIMAL,
    "sitting_height" DECIMAL,
    "weight" DECIMAL,
    "age" DECIMAL,
    "leg_length" DECIMAL,
    "years_fromphv" DECIMAL,
    "age_at_phv" DECIMAL,
    "vertical_jump" DECIMAL,
    "mid_thigh_pull" DECIMAL,
    "relative_mid_thigh_pull" DECIMAL,
    "ten_meter" DECIMAL,
    "five_o_five_left" DECIMAL,
    "five_o_five_right" DECIMAL,
    "aggregate_five_o_five" DECIMAL,
    "rugby_athlete_id" BIGSERIAL NOT NULL,

    CONSTRAINT "rugby_athletes_pkey" PRIMARY KEY ("rugby_athlete_id")
);
