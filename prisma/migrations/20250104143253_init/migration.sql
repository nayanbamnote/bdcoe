/*
  Warnings:

  - You are about to drop the column `currentSemester` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `section` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `yearOfAdmission` on the `Student` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Student_studentId_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "currentSemester",
DROP COLUMN "section",
DROP COLUMN "studentId",
DROP COLUMN "yearOfAdmission";

-- CreateTable
CREATE TABLE "AcademicInfo" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "studentRollNo" TEXT NOT NULL,
    "currentSemester" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "yearOfAdmission" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademicInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AcademicInfo_studentId_key" ON "AcademicInfo"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "AcademicInfo_studentRollNo_key" ON "AcademicInfo"("studentRollNo");

-- AddForeignKey
ALTER TABLE "AcademicInfo" ADD CONSTRAINT "AcademicInfo_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
