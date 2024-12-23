-- CreateTable
CREATE TABLE "SelectedTeam" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "SelectedTeam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SelectedTeam_teamId_key" ON "SelectedTeam"("teamId");
