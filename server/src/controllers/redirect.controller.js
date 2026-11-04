import prisma from '../lib/prisma.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';

const redirectToOriginalUrl = asyncHandler(async (req, res) => {
    const { shortCode } = req.params;

    const link = await prisma.link.findUnique({
        where: { shortCode },
    });

    if (!link) throw new ApiError(404, '⚠ Link not found.');

    await prisma.link.update({
        where: { shortCode },
        data: { clicks: { increment: 1 } },
    });

    res.redirect(link.originalUrl);
});

export default redirectToOriginalUrl;