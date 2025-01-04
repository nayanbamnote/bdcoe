/*
  Warnings:

  - You are about to drop the column `studentRollNo` on the `AcademicInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rollNumber]` on the table `AcademicInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rollNumber` to the `AcademicInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AcademicInfo_studentRollNo_key";

-- AlterTable
ALTER TABLE "AcademicInfo" DROP COLUMN "studentRollNo",
ADD COLUMN     "rollNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AcademicInfo_rollNumber_key" ON "AcademicInfo"("rollNumber");
