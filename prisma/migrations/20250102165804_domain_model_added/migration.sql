/*
  Warnings:

  - You are about to drop the column `problemId` on the `TeamSubmission` table. All the data in the column will be lost.
  - You are about to drop the `ProblemStatement` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `domainId` to the `TeamSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TeamSubmission" DROP CONSTRAINT "TeamSubmission_problemId_fkey";

-- AlterTable
ALTER TABLE "TeamSubmission" DROP COLUMN "problemId",
ADD COLUMN     "domainId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProblemStatement";

-- CreateTable
CREATE TABLE "Domain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeamSubmission" ADD CONSTRAINT "TeamSubmission_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;
