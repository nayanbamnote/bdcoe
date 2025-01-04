-- CreateTable
CREATE TABLE "AcademicDetails" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "totalMarks" INTEGER NOT NULL,
    "outOfMarks" INTEGER NOT NULL,
    "percentage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademicDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AcademicDetails_studentId_label_key" ON "AcademicDetails"("studentId", "label");

-- AddForeignKey
ALTER TABLE "AcademicDetails" ADD CONSTRAINT "AcademicDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
