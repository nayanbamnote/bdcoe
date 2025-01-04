-- CreateTable
CREATE TABLE "GuardianDetails" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "fatherName" TEXT NOT NULL,
    "fatherOccupation" TEXT,
    "fatherQualification" TEXT,
    "fatherContact" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "motherOccupation" TEXT,
    "motherQualification" TEXT,
    "motherContact" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuardianDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuardianDetails_studentId_key" ON "GuardianDetails"("studentId");

-- AddForeignKey
ALTER TABLE "GuardianDetails" ADD CONSTRAINT "GuardianDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
