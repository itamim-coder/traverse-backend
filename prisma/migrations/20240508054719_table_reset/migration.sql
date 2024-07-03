/*
  Warnings:

  - You are about to drop the `tour_package` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tour_package" DROP CONSTRAINT "tour_package_locationId_fkey";

-- DropTable
DROP TABLE "tour_package";

-- CreateTable
CREATE TABLE "tourPackage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "images" TEXT[],
    "starting_date" TEXT NOT NULL,
    "departure" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "available" BOOLEAN DEFAULT false,
    "upcoming" BOOLEAN DEFAULT false,
    "locationId" TEXT NOT NULL,
    "details" TEXT,

    CONSTRAINT "tourPackage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tourPackage" ADD CONSTRAINT "tourPackage_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
