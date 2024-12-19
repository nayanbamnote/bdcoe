/*
  Warnings:

  - A unique constraint covering the columns `[studentId,id]` on the table `HostleDetails` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId,id]` on the table `ScholarshipDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "HostleDetails_studentId_key";

-- DropIndex
DROP INDEX "ScholarshipDetails_studentId_key";

-- CreateIndex
CREATE UNIQUE INDEX "HostleDetails_studentId_id_key" ON "HostleDetails"("studentId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarshipDetails_studentId_id_key" ON "ScholarshipDetails"("studentId", "id");
