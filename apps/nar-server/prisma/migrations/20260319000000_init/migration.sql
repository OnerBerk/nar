-- CreateEnum
CREATE TYPE "RolesEnum" AS ENUM ('Authenticated', 'Admin', 'Ops');

-- CreateEnum
CREATE TYPE "SexEnum" AS ENUM ('Man', 'Woman');

-- CreateEnum
CREATE TYPE "ActivityLevelEnum" AS ENUM ('Sedentary', 'Light', 'Moderate', 'Intense');

-- CreateTable
CREATE TABLE "nar_user" (
    "id"             SERIAL NOT NULL,
    "created_at"     TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"     TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_of_birth"  DATE NOT NULL,
    "lastname"       VARCHAR(255) NOT NULL,
    "firstname"      VARCHAR(255) NOT NULL,
    "email"          VARCHAR(255) NOT NULL,
    "roles"          "RolesEnum"[],
    "sex"            "SexEnum" NOT NULL DEFAULT 'Man',
    "password"       TEXT NOT NULL,
    "BMR"            INTEGER,
    "TDEE"           INTEGER,
    "activity_level" "ActivityLevelEnum" NOT NULL DEFAULT 'Sedentary',

    CONSTRAINT "nar_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nar_user_email_key" ON "nar_user"("email");

-- CreateTable
CREATE TABLE "Measurements" (
    "id"          SERIAL NOT NULL,
    "date"        TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weight"      INTEGER NOT NULL,
    "height"      INTEGER NOT NULL,
    "belly_waist" INTEGER NOT NULL,
    "hip_waist"   INTEGER NOT NULL,
    "thigh"       INTEGER NOT NULL,
    "arm"         INTEGER NOT NULL,
    "chest"       INTEGER NOT NULL,
    "userId"      INTEGER NOT NULL,
    "created_at"  TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"  TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Measurements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Measurements"
    ADD CONSTRAINT "Measurements_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "nar_user"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
