-- CreateTable
CREATE TABLE "ProfileComplete" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "imageUrl" TEXT,
    "college_id" TEXT NOT NULL,
    "rollNumber" TEXT NOT NULL,
    "currentSemester" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "yearOfAdmission" TEXT NOT NULL,
    "aadharNo" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "bloodGroup" TEXT,
    "addressOnAadhar" TEXT NOT NULL,
    "permanentAddress" TEXT,
    "casteCategory" TEXT NOT NULL,
    "subcaste" TEXT,
    "religion" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "fatherOccupation" TEXT,
    "fatherQualification" TEXT,
    "fatherContact" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "motherOccupation" TEXT,
    "motherQualification" TEXT,
    "motherContact" TEXT NOT NULL,
    "siblings" TEXT,
    "interests" TEXT,
    "academicHistory" TEXT,
    "isHosteler" BOOLEAN NOT NULL DEFAULT false,
    "hasScholarship" BOOLEAN NOT NULL DEFAULT false,
    "accommodationDetails" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfileComplete_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfileComplete_studentId_key" ON "ProfileComplete"("studentId");

-- AddForeignKey
ALTER TABLE "ProfileComplete" ADD CONSTRAINT "ProfileComplete_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
