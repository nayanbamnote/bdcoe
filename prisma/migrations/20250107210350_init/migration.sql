-- DropForeignKey
ALTER TABLE "AcademicDetails" DROP CONSTRAINT "AcademicDetails_studentId_fkey";

-- DropForeignKey
ALTER TABLE "AcademicInfo" DROP CONSTRAINT "AcademicInfo_studentId_fkey";

-- DropForeignKey
ALTER TABLE "AdditionalStudentDetails" DROP CONSTRAINT "AdditionalStudentDetails_studentId_fkey";

-- DropForeignKey
ALTER TABLE "GuardianDetails" DROP CONSTRAINT "GuardianDetails_studentId_fkey";

-- DropForeignKey
ALTER TABLE "HobbyDetails" DROP CONSTRAINT "HobbyDetails_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Hostel" DROP CONSTRAINT "Hostel_studentId_fkey";

-- DropForeignKey
ALTER TABLE "HostelDetails" DROP CONSTRAINT "HostelDetails_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Scholarship" DROP CONSTRAINT "Scholarship_studentId_fkey";

-- DropForeignKey
ALTER TABLE "ScholarshipDetails" DROP CONSTRAINT "ScholarshipDetails_studentId_fkey";

-- DropForeignKey
ALTER TABLE "SiblingDetails" DROP CONSTRAINT "SiblingDetails_studentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentProfile" DROP CONSTRAINT "StudentProfile_studentId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalInterestDetails" DROP CONSTRAINT "TechnicalInterestDetails_studentId_fkey";

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicInfo" ADD CONSTRAINT "AcademicInfo_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdditionalStudentDetails" ADD CONSTRAINT "AdditionalStudentDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiblingDetails" ADD CONSTRAINT "SiblingDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuardianDetails" ADD CONSTRAINT "GuardianDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HobbyDetails" ADD CONSTRAINT "HobbyDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalInterestDetails" ADD CONSTRAINT "TechnicalInterestDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicDetails" ADD CONSTRAINT "AcademicDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scholarship" ADD CONSTRAINT "Scholarship_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hostel" ADD CONSTRAINT "Hostel_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarshipDetails" ADD CONSTRAINT "ScholarshipDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostelDetails" ADD CONSTRAINT "HostelDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
