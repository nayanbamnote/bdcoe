-- CreateTable
CREATE TABLE "ScholarshipDetails" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "year" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "criteria" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScholarshipDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScholarshipDetails_studentId_year_key" ON "ScholarshipDetails"("studentId", "year");

-- AddForeignKey
ALTER TABLE "ScholarshipDetails" ADD CONSTRAINT "ScholarshipDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
