-- CreateTable
CREATE TABLE "responses" (
    "response_id" UUID NOT NULL,
    "coach_id" UUID,
    "athlete_id" UUID,
    "bias_id" UUID,
    "likelihood_to_recruit" INTEGER NOT NULL,

    CONSTRAINT "responses_pkey" PRIMARY KEY ("response_id")
);

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "response_coach_id" FOREIGN KEY ("coach_id") REFERENCES "coaches"("coach_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "response_athlete_id" FOREIGN KEY ("athlete_id") REFERENCES "athletes"("athlete_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "response_bias_id" FOREIGN KEY ("bias_id") REFERENCES "biases"("bias_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
