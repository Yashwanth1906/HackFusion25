/*
  Warnings:

  - The primary key for the `ProblemStatement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProblemStatement` table. All the data in the column will be lost.
  - Changed the type of `problemId` on the `TeamSubmission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
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
ALTER TABLE "TeamSubmission" DROP COLUMN "problemId",
ADD COLUMN     "problemId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TeamSubmission" ADD CONSTRAINT "TeamSubmission_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "ProblemStatement"("sno") ON DELETE CASCADE ON UPDATE CASCADE;
