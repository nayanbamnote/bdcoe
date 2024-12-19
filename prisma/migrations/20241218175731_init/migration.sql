/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `SiblingDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SiblingDetails_studentId_key" ON "SiblingDetails"("studentId");
