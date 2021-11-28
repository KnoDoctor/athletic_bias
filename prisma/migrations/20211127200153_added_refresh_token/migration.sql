-- CreateTable
CREATE TABLE "refresh_tokens" (
    "token_id" UUID NOT NULL,
    "token" VARCHAR(500) NOT NULL,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("token_id")
);
