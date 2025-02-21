-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STUDENT'
);

-- CreateTable
CREATE TABLE "Professor" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "phoneNumber" TEXT NOT NULL,
    CONSTRAINT "Professor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tutor" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "availability" TEXT NOT NULL DEFAULT '{}',
    CONSTRAINT "Tutor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Student" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "courseCode" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    CONSTRAINT "Class_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StudySession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tutorId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "time" TEXT NOT NULL DEFAULT '{}',
    CONSTRAINT "StudySession_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudySession_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT,
    "professorId" TEXT,
    "tutorId" TEXT,
    "feedback" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    CONSTRAINT "Feedback_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("userId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Feedback_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("userId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Feedback_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor" ("userId") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ClassToTutor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ClassToTutor_A_fkey" FOREIGN KEY ("A") REFERENCES "Class" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ClassToTutor_B_fkey" FOREIGN KEY ("B") REFERENCES "Tutor" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassToTutor_AB_unique" ON "_ClassToTutor"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassToTutor_B_index" ON "_ClassToTutor"("B");
