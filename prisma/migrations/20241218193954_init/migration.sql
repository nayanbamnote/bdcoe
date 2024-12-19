/*
  Warnings:

  - A unique constraint covering the columns `[studentId,label]` on the table `AcademicDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "AcademicDetails_studentId_key";

-- CreateIndex
CREATE UNIQUE INDEX "AcademicDetails_studentId_label_key" ON "AcademicDetails"("studentId", "label");
