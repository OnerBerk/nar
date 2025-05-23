-- CreateEnum
CREATE TYPE "RolesEnum" AS ENUM ('Authenticated', 'Admin');

-- CreateTable
CREATE TABLE "nar_user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastname" VARCHAR(255) NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "roles" "RolesEnum"[],

    CONSTRAINT "nar_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measurements" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "waist" INTEGER NOT NULL,
    "thigh" INTEGER NOT NULL,
    "arm" INTEGER NOT NULL,
    "chest" INTEGER NOT NULL,
    "hips" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Measurements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nar_user_email_key" ON "nar_user"("email");

-- AddForeignKey
ALTER TABLE "Measurements" ADD CONSTRAINT "Measurements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "nar_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
