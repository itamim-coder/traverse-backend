/*
  Warnings:

  - Added the required column `address` to the `hotel_books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_name` to the `hotel_books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `hotel_books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `tour_books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_name` to the `tour_books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `tour_books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hotel_books" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "customer_name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tour_books" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "customer_name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
