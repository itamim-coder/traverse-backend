/*
  Warnings:

  - Made the column `available` on table `tourPackage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `upcoming` on table `tourPackage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tourPackage" ALTER COLUMN "available" SET NOT NULL,
ALTER COLUMN "upcoming" SET NOT NULL;
