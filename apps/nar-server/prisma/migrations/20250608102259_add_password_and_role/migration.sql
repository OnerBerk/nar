/*
  Warnings:

  - Added the required column `password` to the `nar_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "RolesEnum" ADD VALUE 'Ops';

-- AlterTable
ALTER TABLE "nar_user" ADD COLUMN     "password" TEXT NOT NULL;
