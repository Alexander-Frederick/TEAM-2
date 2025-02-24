/*
  Warnings:

  - A unique constraint covering the columns `[courseCode]` on the table `Class` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Class_courseCode_key" ON "Class"("courseCode");
