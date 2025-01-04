-- CreateTable
CREATE TABLE "HobbyDetails" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "hobby" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HobbyDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnicalInterestDetails" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "interest" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TechnicalInterestDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HobbyDetails" ADD CONSTRAINT "HobbyDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalInterestDetails" ADD CONSTRAINT "TechnicalInterestDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
