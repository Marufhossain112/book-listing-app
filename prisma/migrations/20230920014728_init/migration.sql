/*
  Warnings:

  - You are about to drop the column `bookId` on the `ReviewAndRating` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ReviewAndRating` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewAndRating" DROP CONSTRAINT "ReviewAndRating_bookId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewAndRating" DROP CONSTRAINT "ReviewAndRating_userId_fkey";

-- AlterTable
ALTER TABLE "ReviewAndRating" DROP COLUMN "bookId",
DROP COLUMN "userId";
