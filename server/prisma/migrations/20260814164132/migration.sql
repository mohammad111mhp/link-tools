-- RedefineIndex
DROP INDEX "Qrcode_imageName_key";
CREATE UNIQUE INDEX "Qrcode_name_key" ON "Qrcode"("name");
