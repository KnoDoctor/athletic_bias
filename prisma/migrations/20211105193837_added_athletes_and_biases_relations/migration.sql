-- CreateTable
CREATE TABLE "sports_biases" (
    "sports_biases_id" UUID NOT NULL,
    "sport_id" UUID NOT NULL,
    "bias_id" UUID NOT NULL,

    CONSTRAINT "sports_biases_pkey" PRIMARY KEY ("sports_biases_id")
);

-- AddForeignKey
ALTER TABLE "sports_biases" ADD CONSTRAINT "sports_biases_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "sports"("sport_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sports_biases" ADD CONSTRAINT "sports_biases_bias_id_fkey" FOREIGN KEY ("bias_id") REFERENCES "biases"("bias_id") ON DELETE RESTRICT ON UPDATE CASCADE;
