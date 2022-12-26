/*
  Warnings:

  - Added the required column `ownerId` to the `server_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_server_profiles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ip" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "removeAt" DATETIME,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "server_profiles_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_server_profiles" ("active", "createdAt", "description", "id", "ip", "logo", "port", "removeAt") SELECT "active", "createdAt", "description", "id", "ip", "logo", "port", "removeAt" FROM "server_profiles";
DROP TABLE "server_profiles";
ALTER TABLE "new_server_profiles" RENAME TO "server_profiles";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;