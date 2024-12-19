/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `AcademicDetails` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `HostleDetails` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `ScholarshipDetails` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `TechnicalInterestDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AcademicDetails_studentId_key" ON "AcademicDetails"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "HostleDetails_studentId_key" ON "HostleDetails"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarshipDetails_studentId_key" ON "ScholarshipDetails"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "TechnicalInterestDetails_studentId_key" ON "TechnicalInterestDetails"("studentId");
