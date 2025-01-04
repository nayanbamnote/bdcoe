/*
  Warnings:

  - You are about to drop the `AcademicDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AdditionalStudentDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GuardianDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HobbyDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HostleDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScholarshipDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SiblingDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TechnicalInterestDetails` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `currentSemester` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearOfAdmission` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AcademicDetails" DROP CONSTRAINT "AcademicDetails_studentId_fkey";

-- DropForeignKey
ALTER TABLE "AdditionalStudentDetails" DROP CONSTRAINT "AdditionalStudentDetails_studentId_fkey";

-- DropForeignKey
ALTER TABLE "GuardianDetails" DROP CONSTRAINT "GuardianDetails_studentId_fkey";

-- DropForeignKey
ALTER TABLE "HobbyDetails" DROP CONSTRAINT "HobbyDetails_studentId_fkey";

-- DropForeignKey
ALTER TABLE "HostleDetails" DROP CONSTRAINT "HostleDetails_studentId_fkey";

-- DropForeignKey
ALTER TABLE "ScholarshipDetails" DROP CONSTRAINT "ScholarshipDetails_studentId_fkey";

-- DropForeignKey
ALTER TABLE "SiblingDetails" DROP CONSTRAINT "SiblingDetails_studentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentDetails" DROP CONSTRAINT "StudentDetails_studentId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalInterestDetails" DROP CONSTRAINT "TechnicalInterestDetails_studentId_fkey";

-- DropIndex
DROP INDEX "StudentProfile_email_key";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "currentSemester" TEXT NOT NULL,
ADD COLUMN     "section" TEXT NOT NULL,
ADD COLUMN     "studentId" TEXT NOT NULL,
ADD COLUMN     "yearOfAdmission" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "AcademicDetails";

-- DropTable
DROP TABLE "AdditionalStudentDetails";

-- DropTable
DROP TABLE "GuardianDetails";

-- DropTable
DROP TABLE "HobbyDetails";

-- DropTable
DROP TABLE "HostleDetails";

-- DropTable
DROP TABLE "ScholarshipDetails";

-- DropTable
DROP TABLE "SiblingDetails";

-- DropTable
DROP TABLE "StudentDetails";

-- DropTable
DROP TABLE "TechnicalInterestDetails";

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentId_key" ON "Student"("studentId");
