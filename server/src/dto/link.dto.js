export function toLinkDTO(link) {
    return {
        id: link.id,
        originalUrl: link.originalUrl,
        shortUrl: `${process.env.BASE_URL}/${link.shortCode}`,
        clicks: link.clicks,
        createdAt: link.createdAt,
    };
}