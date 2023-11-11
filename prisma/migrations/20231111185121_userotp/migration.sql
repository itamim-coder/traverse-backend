/*
  Warnings:

  - Made the column `expireAt` on table `otp` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "otp" ALTER COLUMN "expireAt" SET NOT NULL;
