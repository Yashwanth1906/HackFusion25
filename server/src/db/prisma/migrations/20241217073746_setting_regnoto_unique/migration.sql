/*
  Warnings:

  - A unique constraint covering the columns `[regNo]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Member_regNo_key" ON "Member"("regNo");