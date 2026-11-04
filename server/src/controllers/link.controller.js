import { nanoid } from "nanoid";
import prisma from "../lib/prisma.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { toLinkDTO } from "../dto/link.dto.js";

export const shortenLink = asyncHandler(async (req, res) => {
	const { url } = req.body;

	if (!url) throw new ApiError(400, "⚠ URL is required.");

	const shortCode = nanoid(7);
	const link = await prisma.link.create({
		data: {
			originalUrl: url,
			shortCode,
		},
	});

	res.status(201).json(
		new ApiResponse(
			201,
			toLinkDTO(link),
			"Short link created successfully.",
		),
	);
});

export const getLinks = asyncHandler(async (req, res) => {
	const links = await prisma.link.findMany();

	const result = links.map(toLinkDTO);

	res.status(200).json(
		new ApiResponse(200, result, "Data fetched successfully."),
	);
});

export const deleteLink = asyncHandler(async (req, res) => {
	const id = +req.params.id;

	if (!id) throw new ApiError(400, "⚠ ID is required.");

	const result = await prisma.link.delete({ where: { id } });

	res.status(200).json(
		new ApiResponse(200, result, "Link deleted successfully."),
	);
});

export const deleteMultipleLinks = asyncHandler(async (req, res) => {
	const { ids } = req.body;

	if ((!ids) || (ids.length <= 0)) throw new ApiError(400, "⚠ ID is required.");

	const result = await prisma.link.deleteMany({ where: { id: { in: ids } } });

	res.status(200).json(
		new ApiResponse(200, result, "Link deleted successfully."),
	);
});
