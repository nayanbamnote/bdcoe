/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `StudentProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentId` to the `AcademicDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `HobbyDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `HostleDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `ScholarshipDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `SiblingDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `TechnicalInterestDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AcademicDetails" ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "HobbyDetails" ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "HostleDetails" ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ScholarshipDetails" ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SiblingDetails" ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TechnicalInterestDetails" ADD COLUMN     "studentId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_studentId_key" ON "StudentProfile"("studentId");

-- AddForeignKey
ALTER TABLE "HobbyDetails" ADD CONSTRAINT "HobbyDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalInterestDetails" ADD CONSTRAINT "TechnicalInterestDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiblingDetails" ADD CONSTRAINT "SiblingDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicDetails" ADD CONSTRAINT "AcademicDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostleDetails" ADD CONSTRAINT "HostleDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarshipDetails" ADD CONSTRAINT "ScholarshipDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
