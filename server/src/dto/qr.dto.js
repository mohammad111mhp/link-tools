import { STORAGE } from "../config/storage.js";

export function toQrDTO(qr) {
	return {
		id: qr.id,
		content: qr.content,
		contentUrl: `${process.env.FRONTEND_URL}/qrcode/${qr.name}`,
		imageName: `${qr.name}.png`,
		imageUrl: `${process.env.BASE_URL}${STORAGE.QR_ROUTE}/${qr.name}.png`,
		scans: qr.scans,
		createdAt: qr.createdAt,
	};
}
