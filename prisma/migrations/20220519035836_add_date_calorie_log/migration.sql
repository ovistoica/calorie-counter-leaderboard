-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CalorieLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "calories" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "CalorieLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CalorieLog" ("calories", "createdAt", "id", "updatedAt", "userId") SELECT "calories", "createdAt", "id", "updatedAt", "userId" FROM "CalorieLog";
DROP TABLE "CalorieLog";
ALTER TABLE "new_CalorieLog" RENAME TO "CalorieLog";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
