/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFlags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `flag` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserFlags_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserFlags";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "flag" INTEGER NOT NULL,
    "A1" BOOLEAN NOT NULL DEFAULT false,
    "A2" BOOLEAN NOT NULL DEFAULT false,
    "A3" BOOLEAN NOT NULL DEFAULT false,
    "A4" BOOLEAN NOT NULL DEFAULT false,
    "A5" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("id", "name") SELECT "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
