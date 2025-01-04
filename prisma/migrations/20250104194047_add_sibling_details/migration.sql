-- CreateTable
CREATE TABLE "AdditionalStudentDetails" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "aadharNo" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "addressOnAadhar" TEXT NOT NULL,
    "permanentAddress" TEXT,
    "casteCategory" TEXT NOT NULL,
    "subcaste" TEXT,
    "religion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdditionalStudentDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiblingDetails" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "aadharNo" VARCHAR(14) NOT NULL,
    "occupation" TEXT NOT NULL,
    "organizationAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiblingDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdditionalStudentDetails_studentId_key" ON "AdditionalStudentDetails"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "AdditionalStudentDetails_aadharNo_key" ON "AdditionalStudentDetails"("aadharNo");

-- AddForeignKey
ALTER TABLE "AdditionalStudentDetails" ADD CONSTRAINT "AdditionalStudentDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiblingDetails" ADD CONSTRAINT "SiblingDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
