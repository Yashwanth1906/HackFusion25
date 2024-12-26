/*
  Warnings:

  - You are about to drop the `SelectedTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'approved', 'rejected');

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending';

-- DropTable
DROP TABLE "SelectedTeam";
