-- CreateTable
CREATE TABLE "_ClassToProfessor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ClassToProfessor_A_fkey" FOREIGN KEY ("A") REFERENCES "Class" ("courseCode") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ClassToProfessor_B_fkey" FOREIGN KEY ("B") REFERENCES "Professor" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Class" (
    "courseCode" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "professorId" TEXT NOT NULL
);
INSERT INTO "new_Class" ("courseCode", "name", "professorId") SELECT "courseCode", "name", "professorId" FROM "Class";
DROP TABLE "Class";
ALTER TABLE "new_Class" RENAME TO "Class";
CREATE UNIQUE INDEX "Class_courseCode_key" ON "Class"("courseCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_ClassToProfessor_AB_unique" ON "_ClassToProfessor"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassToProfessor_B_index" ON "_ClassToProfessor"("B");
