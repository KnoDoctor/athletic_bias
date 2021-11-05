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

    CONSTRAINT "coaches_pkey" PRIMARY KEY ("coach_id")
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

-- CreateIndex
CREATE UNIQUE INDEX "coaches_email_key" ON "coaches"("email");

-- AddForeignKey
ALTER TABLE "coaches" ADD CONSTRAINT "coach_sport_id" FOREIGN KEY ("sport_id") REFERENCES "sports"("sport_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
