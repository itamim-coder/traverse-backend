/*
  Warnings:

  - The primary key for the `RoomNumber` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "RoomNumber" DROP CONSTRAINT "RoomNumber_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "RoomNumber_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RoomNumber_id_seq";

-- AlterTable
ALTER TABLE "books" ALTER COLUMN "photos" SET DATA TYPE TEXT[];
