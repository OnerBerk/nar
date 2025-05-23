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
    "weight" INTEGER,
    "height" INTEGER,
    "waist" INTEGER,
    "thigh" INTEGER,
    "arm" INTEGER,
    "chest" INTEGER,
    "hips" INTEGER,
    "roles" "RolesEnum"[],

    CONSTRAINT "nar_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weighing" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL,
    "weight" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "weighing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nar_user_email_key" ON "nar_user"("email");

-- AddForeignKey
ALTER TABLE "weighing" ADD CONSTRAINT "weighing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "nar_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
