/*
  Warnings:

  - You are about to drop the column `qrImgName` on the `Qrcode` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Qrcode` table. All the data in the column will be lost.
  - Added the required column `content` to the `Qrcode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageName` to the `Qrcode` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Qrcode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "imageName" TEXT NOT NULL,
    "scans" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Qrcode" ("createdAt", "id", "scans") SELECT "createdAt", "id", "scans" FROM "Qrcode";
DROP TABLE "Qrcode";
ALTER TABLE "new_Qrcode" RENAME TO "Qrcode";
CREATE UNIQUE INDEX "Qrcode_imageName_key" ON "Qrcode"("imageName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
