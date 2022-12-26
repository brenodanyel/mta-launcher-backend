-- CreateTable
CREATE TABLE "server_profiles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ip" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "server_profile_external_links" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serverId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    CONSTRAINT "server_profile_external_links_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "server_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "removeAt" DATETIME,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "serverProfileId" TEXT,
    CONSTRAINT "user_products_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_products_serverProfileId_fkey" FOREIGN KEY ("serverProfileId") REFERENCES "server_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_user_products" ("active", "clientId", "createdAt", "id", "productId", "removeAt") SELECT "active", "clientId", "createdAt", "id", "productId", "removeAt" FROM "user_products";
DROP TABLE "user_products";
ALTER TABLE "new_user_products" RENAME TO "user_products";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
