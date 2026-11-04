import path from "path";

export const STORAGE = {
	QR_DIR: path.join(process.cwd(), "public", "qrcodes"),

	QR_ROUTE: "/api/v1/qrcode",
};
