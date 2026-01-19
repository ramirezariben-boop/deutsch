-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
