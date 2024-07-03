/*
  Warnings:

  - You are about to drop the `tour` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tour" DROP CONSTRAINT "tour_locationId_fkey";

-- DropTable
DROP TABLE "tour";
