/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Feedback` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `className` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Feedback` table. All the data in the column will be lost.
  - You are about to alter the column `professorId` on the `Feedback` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `studentId` on the `Feedback` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `tutorId` on the `Feedback` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Professor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Professor` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Student` table. All the data in the column will be lost.
  - The primary key for the `StudySession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `classId` on the `StudySession` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `StudySession` table. All the data in the column will be lost.
  - You are about to alter the column `tutorId` on the `StudySession` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Tutor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Tutor` table. All the data in the column will be lost.
  - You are about to alter the column `A` on the `_ClassToProfessor` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_ClassToProfessor` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `A` on the `_ClassToTutor` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_ClassToTutor` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `classId` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classCode` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feedbackId` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Made the column `studentId` on table `Feedback` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `email` to the `Professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professorId` to the `Professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classCode` to the `StudySession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `StudySession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Tutor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Tutor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tutorId` to the `Tutor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Class" (
    "classId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "courseCode" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Class" ("courseCode", "name") SELECT "courseCode", "name" FROM "Class";
DROP TABLE "Class";
ALTER TABLE "new_Class" RENAME TO "Class";
CREATE UNIQUE INDEX "Class_courseCode_key" ON "Class"("courseCode");
CREATE TABLE "new_Feedback" (
    "feedbackId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "professorId" INTEGER,
    "tutorId" INTEGER,
    "classCode" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    CONSTRAINT "Feedback_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("studentId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Feedback_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("professorId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Feedback_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor" ("tutorId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Feedback_classCode_fkey" FOREIGN KEY ("classCode") REFERENCES "Class" ("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Feedback" ("feedback", "professorId", "studentId", "tutorId") SELECT "feedback", "professorId", "studentId", "tutorId" FROM "Feedback";
DROP TABLE "Feedback";
ALTER TABLE "new_Feedback" RENAME TO "Feedback";
CREATE TABLE "new_Professor" (
    "professorId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL
);
INSERT INTO "new_Professor" ("phoneNumber") SELECT "phoneNumber" FROM "Professor";
DROP TABLE "Professor";
ALTER TABLE "new_Professor" RENAME TO "Professor";
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");
CREATE TABLE "new_Student" (
    "studentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
CREATE TABLE "new_StudySession" (
    "sessionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tutorId" INTEGER NOT NULL,
    "classCode" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    CONSTRAINT "StudySession_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor" ("tutorId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudySession_classCode_fkey" FOREIGN KEY ("classCode") REFERENCES "Class" ("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StudySession" ("location", "time", "tutorId") SELECT "location", "time", "tutorId" FROM "StudySession";
DROP TABLE "StudySession";
ALTER TABLE "new_StudySession" RENAME TO "StudySession";
CREATE TABLE "new_Tutor" (
    "tutorId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "availability" TEXT NOT NULL
);
INSERT INTO "new_Tutor" ("availability") SELECT "availability" FROM "Tutor";
DROP TABLE "Tutor";
ALTER TABLE "new_Tutor" RENAME TO "Tutor";
CREATE UNIQUE INDEX "Tutor_email_key" ON "Tutor"("email");
CREATE TABLE "new__ClassToProfessor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ClassToProfessor_A_fkey" FOREIGN KEY ("A") REFERENCES "Class" ("classId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ClassToProfessor_B_fkey" FOREIGN KEY ("B") REFERENCES "Professor" ("professorId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__ClassToProfessor" ("A", "B") SELECT "A", "B" FROM "_ClassToProfessor";
DROP TABLE "_ClassToProfessor";
ALTER TABLE "new__ClassToProfessor" RENAME TO "_ClassToProfessor";
CREATE UNIQUE INDEX "_ClassToProfessor_AB_unique" ON "_ClassToProfessor"("A", "B");
CREATE INDEX "_ClassToProfessor_B_index" ON "_ClassToProfessor"("B");
CREATE TABLE "new__ClassToTutor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ClassToTutor_A_fkey" FOREIGN KEY ("A") REFERENCES "Class" ("classId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ClassToTutor_B_fkey" FOREIGN KEY ("B") REFERENCES "Tutor" ("tutorId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__ClassToTutor" ("A", "B") SELECT "A", "B" FROM "_ClassToTutor";
DROP TABLE "_ClassToTutor";
ALTER TABLE "new__ClassToTutor" RENAME TO "_ClassToTutor";
CREATE UNIQUE INDEX "_ClassToTutor_AB_unique" ON "_ClassToTutor"("A", "B");
CREATE INDEX "_ClassToTutor_B_index" ON "_ClassToTutor"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
