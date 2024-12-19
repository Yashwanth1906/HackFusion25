-- DropForeignKey
ALTER TABLE "ContactUs" DROP CONSTRAINT "ContactUs_replyId_fkey";

-- DropForeignKey
ALTER TABLE "TeamSubmission" DROP CONSTRAINT "TeamSubmission_problemId_fkey";

-- AddForeignKey
ALTER TABLE "TeamSubmission" ADD CONSTRAINT "TeamSubmission_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "ProblemStatement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_id_fkey" FOREIGN KEY ("id") REFERENCES "ContactUs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
