/*
  Warnings:

  - You are about to drop the `UserVerification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserVerification" DROP CONSTRAINT "UserVerification_userId_fkey";

-- DropTable
DROP TABLE "UserVerification";

-- CreateTable
CREATE TABLE "otp" (
    "id" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expireAt" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("id")
);
