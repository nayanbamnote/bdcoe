-- CreateTable
CREATE TABLE "HostelDetails" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "year" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "roomDetails" TEXT NOT NULL,
    "partnerDetails" TEXT NOT NULL,
    "transportation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HostelDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HostelDetails_studentId_year_key" ON "HostelDetails"("studentId", "year");

-- AddForeignKey
ALTER TABLE "HostelDetails" ADD CONSTRAINT "HostelDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
