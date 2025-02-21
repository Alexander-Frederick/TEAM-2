/*
  Warnings:

  - You are about to drop the column `professorId` on the `Class` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Class" (
    "courseCode" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Class" ("courseCode", "name") SELECT "courseCode", "name" FROM "Class";
DROP TABLE "Class";
ALTER TABLE "new_Class" RENAME TO "Class";
CREATE UNIQUE INDEX "Class_courseCode_key" ON "Class"("courseCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
