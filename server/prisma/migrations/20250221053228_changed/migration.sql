/*
  Warnings:

  - The primary key for the `Class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Class` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Class" (
    "courseCode" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    CONSTRAINT "Class_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Class" ("courseCode", "name", "professorId") SELECT "courseCode", "name", "professorId" FROM "Class";
DROP TABLE "Class";
ALTER TABLE "new_Class" RENAME TO "Class";
CREATE UNIQUE INDEX "Class_courseCode_key" ON "Class"("courseCode");
CREATE TABLE "new_StudySession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tutorId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "time" TEXT NOT NULL DEFAULT '{}',
    CONSTRAINT "StudySession_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudySession_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StudySession" ("classId", "id", "location", "time", "tutorId") SELECT "classId", "id", "location", "time", "tutorId" FROM "StudySession";
DROP TABLE "StudySession";
ALTER TABLE "new_StudySession" RENAME TO "StudySession";
CREATE TABLE "new__ClassToTutor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ClassToTutor_A_fkey" FOREIGN KEY ("A") REFERENCES "Class" ("courseCode") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ClassToTutor_B_fkey" FOREIGN KEY ("B") REFERENCES "Tutor" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__ClassToTutor" ("A", "B") SELECT "A", "B" FROM "_ClassToTutor";
DROP TABLE "_ClassToTutor";
ALTER TABLE "new__ClassToTutor" RENAME TO "_ClassToTutor";
CREATE UNIQUE INDEX "_ClassToTutor_AB_unique" ON "_ClassToTutor"("A", "B");
CREATE INDEX "_ClassToTutor_B_index" ON "_ClassToTutor"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
