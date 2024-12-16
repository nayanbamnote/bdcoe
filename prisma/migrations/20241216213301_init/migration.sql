/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clerkUserId" TEXT NOT NULL,
    "studentID" TEXT NOT NULL,
    "currentSemester" TEXT NOT NULL DEFAULT 'Semester 1',
    "section" TEXT NOT NULL DEFAULT 'A',
    "yearOfAdmission" TEXT NOT NULL DEFAULT '2021',
    "studentDetailsId" INTEGER,
    "localGuardianId" INTEGER,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuardianDetails" (
    "id" SERIAL NOT NULL,
    "fatherName" TEXT NOT NULL,
    "fatherOccupation" TEXT,
    "fatherQualification" TEXT,
    "fatherContact" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "motherOccupation" TEXT,
    "motherQualification" TEXT,
    "motherContact" TEXT NOT NULL,

    CONSTRAINT "GuardianDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentDetails" (
    "id" SERIAL NOT NULL,
    "aadharNo" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "addressOnAadhar" TEXT NOT NULL,
    "permanentAddress" TEXT,
    "casteCategory" TEXT NOT NULL,
    "subcaste" TEXT,
    "religion" TEXT NOT NULL,

    CONSTRAINT "StudentDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HobbyDetails" (
    "id" SERIAL NOT NULL,
    "hobby" VARCHAR(255) NOT NULL,

    CONSTRAINT "HobbyDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnicalInterestDetails" (
    "id" SERIAL NOT NULL,
    "interest" VARCHAR(255) NOT NULL,

    CONSTRAINT "TechnicalInterestDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiblingDetails" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "aadharNo" VARCHAR(14) NOT NULL,
    "occupation" TEXT NOT NULL,
    "organizationAddress" TEXT NOT NULL,

    CONSTRAINT "SiblingDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicDetails" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "totalMarks" INTEGER NOT NULL,
    "outOfMarks" INTEGER NOT NULL,
    "percentage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademicDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HostleDetails" (
    "id" SERIAL NOT NULL,
    "academicYear" TEXT NOT NULL,
    "roomDetails" TEXT NOT NULL,
    "partnerDetails" TEXT NOT NULL,
    "transportation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HostleDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarshipDetails" (
    "id" SERIAL NOT NULL,
    "academicYear" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "criteria" TEXT NOT NULL,
    "amount" TEXT NOT NULL,

    CONSTRAINT "ScholarshipDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_clerkUserId_key" ON "Student"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentID_key" ON "Student"("studentID");

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentDetailsId_key" ON "Student"("studentDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_localGuardianId_key" ON "Student"("localGuardianId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentDetails_aadharNo_key" ON "StudentDetails"("aadharNo");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_email_key" ON "StudentProfile"("email");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_studentDetailsId_fkey" FOREIGN KEY ("studentDetailsId") REFERENCES "StudentDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_localGuardianId_fkey" FOREIGN KEY ("localGuardianId") REFERENCES "GuardianDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;
