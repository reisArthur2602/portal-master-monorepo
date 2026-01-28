-- CreateEnum
CREATE TYPE "ExamStatus" AS ENUM ('Pending', 'Ready', 'AwaitingPickup', 'Delivered');

-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('External', 'DICOM');

-- CreateTable
CREATE TABLE "exams" (
    "id" TEXT NOT NULL,
    "status" "ExamStatus" NOT NULL DEFAULT 'Pending',
    "type" "ExamType" NOT NULL DEFAULT 'External',
    "registry" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "orthancStudyId" TEXT,
    "performedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "patientId" TEXT NOT NULL,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exams" ADD CONSTRAINT "exams_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
