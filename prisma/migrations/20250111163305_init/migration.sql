/*
  Warnings:

  - A unique constraint covering the columns `[college_id]` on the table `AcademicInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `college_id` to the `AcademicInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AcademicInfo" ADD COLUMN     "college_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AcademicInfo_college_id_key" ON "AcademicInfo"("college_id");
