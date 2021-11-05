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
CREATE TABLE "biases" (
    "bias_id" UUID NOT NULL,
    "name" VARCHAR(250),

    CONSTRAINT "biases_pkey" PRIMARY KEY ("bias_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "athletes_email_key" ON "athletes"("email");

-- AddForeignKey
ALTER TABLE "athletes" ADD CONSTRAINT "athlete_sport_id" FOREIGN KEY ("sport_id") REFERENCES "sports"("sport_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
