/*
  Warnings:

  - You are about to drop the column `hips` on the `Measurements` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SexEnum" AS ENUM ('Man', 'Woman');

-- AlterTable
ALTER TABLE "Measurements" DROP COLUMN "hips";

-- AlterTable
ALTER TABLE "nar_user" ADD COLUMN     "sex" "SexEnum" NOT NULL DEFAULT 'Man';
