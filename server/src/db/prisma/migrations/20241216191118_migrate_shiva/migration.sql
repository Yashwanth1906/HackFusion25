/*
  Warnings:

  - A unique constraint covering the columns `[teamId]` on the table `TeamSubmission` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_teamSubmissionId_fkey";

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "teamSubmissionId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TeamSubmission_teamId_key" ON "TeamSubmission"("teamId");

-- AddForeignKey
ALTER TABLE "TeamSubmission" ADD CONSTRAINT "TeamSubmission_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
