/*
  Warnings:

  - You are about to drop the column `teamSubmissionId` on the `Team` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Team_teamSubmissionId_key";

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "phoneno" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "teamSubmissionId";
