-- CreateTable
CREATE TABLE "WritingExam" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WritingExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheatingEvent" (
    "id" SERIAL NOT NULL,
    "examId" INTEGER NOT NULL,
    "eventType" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "CheatingEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WritingLog" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "event" TEXT NOT NULL,
    "data" TEXT,
    "suspected" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WritingLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WritingExam_studentId_key" ON "WritingExam"("studentId");

-- AddForeignKey
ALTER TABLE "CheatingEvent" ADD CONSTRAINT "CheatingEvent_examId_fkey" FOREIGN KEY ("examId") REFERENCES "WritingExam"("id") ON DELETE CASCADE ON UPDATE CASCADE;
