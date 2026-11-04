/*
  Warnings:

  - You are about to drop the column `imageName` on the `Qrcode` table. All the data in the column will be lost.
  - Added the required column `name` to the `Qrcode` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
-- PRAGMA defer_foreign_keys=ON;
-- PRAGMA foreign_keys=OFF;
-- CREATE TABLE "new_Qrcode" (
--     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
--     "content" TEXT NOT NULL,
--     "name" TEXT NOT NULL,
--     "scans" INTEGER NOT NULL DEFAULT 0,
--     "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
-- );
-- INSERT INTO "new_Qrcode" ("content", "createdAt", "id", "scans") SELECT "content", "createdAt", "id", "scans" FROM "Qrcode";
-- DROP TABLE "Qrcode";
-- ALTER TABLE "new_Qrcode" RENAME TO "Qrcode";
-- CREATE UNIQUE INDEX "Qrcode_name_key" ON "Qrcode"("name");
-- PRAGMA foreign_keys=ON;
-- PRAGMA defer_foreign_keys=OFF;
ALTER TABLE "Qrcode" RENAME COLUMN "imageName" TO "name";
