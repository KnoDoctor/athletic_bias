-- CreateTable
CREATE TABLE "responses" (
    "response_id" UUID NOT NULL,
    "coach_id" UUID,
    "athlete_id" UUID,
    "bias_id" UUID,
    "likelihood_to_recruit" INTEGER NOT NULL,

    CONSTRAINT "responses_pkey" PRIMARY KEY ("response_id")
);

-- CreateTable
CREATE TABLE "coaches" (
    "first_name" VARCHAR(250),
    "coach_id" UUID NOT NULL,
    "email" VARCHAR(100),
    "last_name" VARCHAR(250),
    "date_of_birth" DATE,
    "gender_identity" VARCHAR(100),
    "education_level" VARCHAR(100),
    "sport_id" UUID,
    "has_consented" BOOLEAN,
    "access_code" VARCHAR(10),
    "city_of_birth" VARCHAR(150),
    "city_of_residence" VARCHAR(150),

    CONSTRAINT "coaches_pkey" PRIMARY KEY ("coach_id")
);

-- CreateTable
CREATE TABLE "athletes" (
    "athlete_id" UUID NOT NULL,
    "email" VARCHAR(100),
    "first_name" VARCHAR(250),
    "last_name" VARCHAR(250),
    "date_of_birth" DATE,
    "gender_identity" VARCHAR(100),
    "education_level" VARCHAR(100),
    "has_consented" BOOLEAN,
    "sport_id" UUID,

    CONSTRAINT "athletes_pkey" PRIMARY KEY ("athlete_id")
);

-- CreateTable
CREATE TABLE "sports" (
    "sport_id" UUID NOT NULL,
    "name" VARCHAR(250),

    CONSTRAINT "sports_pkey" PRIMARY KEY ("sport_id")
);

-- CreateTable
CREATE TABLE "preferences" (
    "preference_id" UUID NOT NULL,
    "name" VARCHAR(250),

    CONSTRAINT "preferences_pkey" PRIMARY KEY ("preference_id")
);

-- CreateTable
CREATE TABLE "biases" (
    "bias_id" UUID NOT NULL,
    "name" VARCHAR(250),

    CONSTRAINT "biases_pkey" PRIMARY KEY ("bias_id")
);

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

-- CreateTable
CREATE TABLE "sports_biases" (
    "sports_biases_id" UUID NOT NULL,
    "sport_id" UUID NOT NULL,
    "bias_id" UUID NOT NULL,

    CONSTRAINT "sports_biases_pkey" PRIMARY KEY ("sports_biases_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "password" VARCHAR(500) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "token_id" UUID NOT NULL,
    "token" VARCHAR(500) NOT NULL,
    "expiry_date" DATE,
    "parent_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("token_id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "coaches_email_key" ON "coaches"("email");

-- CreateIndex
CREATE UNIQUE INDEX "athletes_email_key" ON "athletes"("email");

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "response_athlete_id" FOREIGN KEY ("athlete_id") REFERENCES "athletes"("athlete_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "response_bias_id" FOREIGN KEY ("bias_id") REFERENCES "biases"("bias_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "response_coach_id" FOREIGN KEY ("coach_id") REFERENCES "coaches"("coach_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "coaches" ADD CONSTRAINT "coach_sport_id" FOREIGN KEY ("sport_id") REFERENCES "sports"("sport_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "athletes" ADD CONSTRAINT "athlete_sport_id" FOREIGN KEY ("sport_id") REFERENCES "sports"("sport_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "coaches_preferences" ADD CONSTRAINT "coaches_preferences_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coaches"("coach_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coaches_preferences" ADD CONSTRAINT "coaches_preferences_preference_id_fkey" FOREIGN KEY ("preference_id") REFERENCES "preferences"("preference_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sports_preferences" ADD CONSTRAINT "sports_preferences_preference_id_fkey" FOREIGN KEY ("preference_id") REFERENCES "preferences"("preference_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sports_preferences" ADD CONSTRAINT "sports_preferences_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "sports"("sport_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sports_biases" ADD CONSTRAINT "sports_biases_bias_id_fkey" FOREIGN KEY ("bias_id") REFERENCES "biases"("bias_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sports_biases" ADD CONSTRAINT "sports_biases_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "sports"("sport_id") ON DELETE RESTRICT ON UPDATE CASCADE;
