/*
  Warnings:

  - You are about to drop the `user_products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "user_products";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_server_profiles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ip" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "removeAt" DATETIME,
    "active" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_server_profiles" ("description", "id", "ip", "port") SELECT "description", "id", "ip", "port" FROM "server_profiles";
DROP TABLE "server_profiles";
ALTER TABLE "new_server_profiles" RENAME TO "server_profiles";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
