/*
  Warnings:

  - You are about to drop the column `cover_photo` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail_1` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail_2` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `cover_photo` on the `hotels` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `hotels` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail_1` on the `hotels` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail_2` on the `hotels` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail_3` on the `hotels` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail_4` on the `hotels` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `hotels` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "cover_photo",
DROP COLUMN "thumbnail_1",
DROP COLUMN "thumbnail_2",
ADD COLUMN     "photos" JSONB[];

-- AlterTable
ALTER TABLE "hotels" DROP COLUMN "cover_photo",
DROP COLUMN "createdAt",
DROP COLUMN "thumbnail_1",
DROP COLUMN "thumbnail_2",
DROP COLUMN "thumbnail_3",
DROP COLUMN "thumbnail_4",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "photos" TEXT[],
ADD COLUMN     "updated_at" TIMESTAMP(3);
