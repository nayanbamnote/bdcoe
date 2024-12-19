/*
  Warnings:

  - You are about to drop the column `currentSemester` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `localGuardianId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `section` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `studentDetailsId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `studentID` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `yearOfAdmission` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `GuardianDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentId` to the `GuardianDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `StudentDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_localGuardianId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_studentDetailsId_fkey";

-- DropIndex
DROP INDEX "Student_localGuardianId_key";

-- DropIndex
DROP INDEX "Student_studentDetailsId_key";

-- DropIndex
DROP INDEX "Student_studentID_key";

-- AlterTable
ALTER TABLE "GuardianDetails" ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "currentSemester",
DROP COLUMN "localGuardianId",
DROP COLUMN "section",
DROP COLUMN "studentDetailsId",
DROP COLUMN "studentID",
DROP COLUMN "yearOfAdmission";

-- AlterTable
ALTER TABLE "StudentDetails" ADD COLUMN     "studentId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "AdditionalStudentDetails" (
    "studentID" TEXT NOT NULL,
    "currentSemester" TEXT NOT NULL DEFAULT 'Semester 1',
    "section" TEXT NOT NULL DEFAULT 'A',
    "yearOfAdmission" TEXT NOT NULL DEFAULT '2021',
    "studentId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AdditionalStudentDetails_studentID_key" ON "AdditionalStudentDetails"("studentID");

-- CreateIndex
CREATE UNIQUE INDEX "AdditionalStudentDetails_studentId_key" ON "AdditionalStudentDetails"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "GuardianDetails_studentId_key" ON "GuardianDetails"("studentId");

-- AddForeignKey
ALTER TABLE "AdditionalStudentDetails" ADD CONSTRAINT "AdditionalStudentDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuardianDetails" ADD CONSTRAINT "GuardianDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentDetails" ADD CONSTRAINT "StudentDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
