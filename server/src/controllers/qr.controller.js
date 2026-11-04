import QRCode from "qrcode";
import path from "path";
import { nanoid } from "nanoid";
import prisma from "../lib/prisma.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STORAGE } from "../config/storage.js";
import { toQrDTO } from "../dto/qr.dto.js";

const QR_OPTIONS = {
	width: 300,
	margin: 2,
	errorCorrectionLevel: "M",
};

export const generatePersistentQr = asyncHandler(async (req, res) => {
	const { content } = req.body;

	if (!content) throw new ApiError(400, "⚠ Content is required.");

	const qrName = nanoid(8);
	const qrUrl = `${process.env.FRONTEND_URL}/qrcode/${qrName}`;
	const filePath = path.join(STORAGE.QR_DIR, `${qrName}.png`);
	await QRCode.toFile(filePath, qrUrl, QR_OPTIONS);

	const result = await prisma.qrcode.create({
		data: {
			content,
			name: qrName,
		},
	});

	res.status(201).json(
		new ApiResponse(
			201,
			toQrDTO(result),
			"QR code generated successfully.",
		),
	);
});

export const generatePreviewQr = asyncHandler(async (req, res) => {
	const { content } = req.body;

	if (!content) throw new ApiError(400, "⚠ Content is required.");

	const qrDataUrl = await QRCode.toDataURL(content, QR_OPTIONS);

	res.status(201).json(
		new ApiResponse(201, qrDataUrl, "QR code generated successfully."),
	);
});

export const getQr = asyncHandler(async (req, res) => {
	const { name } = req.params;

	const result = await prisma.qrcode.update({
		where: { name },
		data: { scans: { increment: 1 } },
	});

	res.status(200).json(
		new ApiResponse(200, toQrDTO(result), "Data fetched successfully."),
	);
});

export const getQRCodes = asyncHandler(async (req, res) => {
	const qrcodes = await prisma.qrcode.findMany();

	const result = qrcodes.map(toQrDTO);

	res.status(200).json(
		new ApiResponse(200, result, "Data fetched successfully."),
	);
});

export const deleteQr = asyncHandler(async (req, res) => {
	const id = +req.params.id;

	if (!id) throw new ApiError(400, "⚠ ID is required.");

	const result = await prisma.qrcode.delete({ where: { id } });

	res.status(200).json(
		new ApiResponse(200, result, "QRcode deleted successfully."),
	);
});

export const deleteMultipleQrs = asyncHandler(async (req, res) => {
	const { ids } = req.body;

	if (!ids || ids.length <= 0) throw new ApiError(400, "⚠ ID is required.");

	const result = await prisma.qrcode.deleteMany({
		where: { id: { in: ids } },
	});

	res.status(200).json(
		new ApiResponse(200, result, "QRcodes deleted successfully."),
	);
});
