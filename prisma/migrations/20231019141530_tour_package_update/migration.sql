/*
  Warnings:

  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TourPackage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `books` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hotels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoomNumber" DROP CONSTRAINT "RoomNumber_roomId_fkey";

-- DropForeignKey
ALTER TABLE "TourPackage" DROP CONSTRAINT "TourPackage_locationId_fkey";

-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "hotels" DROP CONSTRAINT "hotels_locationId_fkey";

-- DropForeignKey
ALTER TABLE "room_review_and_ratings" DROP CONSTRAINT "room_review_and_ratings_roomId_fkey";

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "TourPackage";

-- DropTable
DROP TABLE "books";

-- DropTable
DROP TABLE "hotels";

-- CreateTable
CREATE TABLE "location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "average_rating" DOUBLE PRECISION NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "photos" TEXT[],
    "cheapest_price" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "locationId" TEXT NOT NULL,

    CONSTRAINT "hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "maxPeople" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "photos" TEXT[],
    "hotelId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_package" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "images" TEXT[],
    "starting_date" TEXT NOT NULL,
    "departure" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "available" BOOLEAN NOT NULL,
    "locationId" TEXT NOT NULL,
    "details" TEXT,

    CONSTRAINT "tour_package_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hotel" ADD CONSTRAINT "hotel_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomNumber" ADD CONSTRAINT "RoomNumber_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_package" ADD CONSTRAINT "tour_package_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_review_and_ratings" ADD CONSTRAINT "room_review_and_ratings_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
