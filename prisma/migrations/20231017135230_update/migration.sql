/*
  Warnings:

  - You are about to drop the column `photos` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `photos` on the `hotels` table. All the data in the column will be lost.
  - Added the required column `cover_photo` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail_1` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail_2` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover_photo` to the `hotels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail_1` to the `hotels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail_2` to the `hotels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail_3` to the `hotels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail_4` to the `hotels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "photos",
ADD COLUMN     "cover_photo" TEXT NOT NULL,
ADD COLUMN     "thumbnail_1" TEXT NOT NULL,
ADD COLUMN     "thumbnail_2" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "hotels" DROP COLUMN "photos",
ADD COLUMN     "cover_photo" TEXT NOT NULL,
ADD COLUMN     "thumbnail_1" TEXT NOT NULL,
ADD COLUMN     "thumbnail_2" TEXT NOT NULL,
ADD COLUMN     "thumbnail_3" TEXT NOT NULL,
ADD COLUMN     "thumbnail_4" TEXT NOT NULL;
