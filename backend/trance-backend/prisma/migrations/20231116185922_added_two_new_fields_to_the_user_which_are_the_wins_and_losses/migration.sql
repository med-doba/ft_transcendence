-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Losses" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Wins" INTEGER NOT NULL DEFAULT 0;
