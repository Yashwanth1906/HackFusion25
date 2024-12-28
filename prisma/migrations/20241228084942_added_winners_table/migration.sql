/*
  Warnings:

  - The primary key for the `ProblemStatement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProblemStatement` table. All the data in the column will be lost.
  - You are about to drop the `SelectedTeam` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `problemId` on the `TeamSubmission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'approved', 'rejected');

-- DropForeignKey
ALTER TABLE "TeamSubmission" DROP CONSTRAINT "TeamSubmission_problemId_fkey";

-- AlterTable
CREATE SEQUENCE problemstatement_sno_seq;
ALTER TABLE "ProblemStatement" DROP CONSTRAINT "ProblemStatement_pkey",
DROP COLUMN "id",
ALTER COLUMN "sno" SET DEFAULT nextval('problemstatement_sno_seq'),
ADD CONSTRAINT "ProblemStatement_pkey" PRIMARY KEY ("sno");
ALTER SEQUENCE problemstatement_sno_seq OWNED BY "ProblemStatement"."sno";

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "TeamSubmission" DROP COLUMN "problemId",
ADD COLUMN     "problemId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "SelectedTeam";

-- CreateTable
CREATE TABLE "RoundOneWinners" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',

    CONSTRAINT "RoundOneWinners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoundThreeWinners" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',

    CONSTRAINT "RoundThreeWinners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoundTwoWinners" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',

    CONSTRAINT "RoundTwoWinners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoundOneWinners_teamId_key" ON "RoundOneWinners"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "RoundThreeWinners_teamId_key" ON "RoundThreeWinners"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "RoundTwoWinners_teamId_key" ON "RoundTwoWinners"("teamId");

-- AddForeignKey
ALTER TABLE "TeamSubmission" ADD CONSTRAINT "TeamSubmission_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "ProblemStatement"("sno") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoundOneWinners" ADD CONSTRAINT "RoundOneWinners_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
