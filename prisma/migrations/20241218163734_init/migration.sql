/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `HobbyDetails` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `StudentDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "HobbyDetails_studentId_key" ON "HobbyDetails"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentDetails_studentId_key" ON "StudentDetails"("studentId");
