-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_teamId_fkey";

-- DropForeignKey
ALTER TABLE "TeamSubmission" DROP CONSTRAINT "TeamSubmission_teamId_fkey";

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamSubmission" ADD CONSTRAINT "TeamSubmission_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
