-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "password" VARCHAR(500) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);
