/*
  Warnings:

  - You are about to drop the column `name` on the `product_advantages` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product_advantages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "product_advantages_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_product_advantages" ("description", "id", "productId") SELECT "description", "id", "productId" FROM "product_advantages";
DROP TABLE "product_advantages";
ALTER TABLE "new_product_advantages" RENAME TO "product_advantages";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
