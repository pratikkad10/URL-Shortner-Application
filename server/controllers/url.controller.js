import { createUrl, deleteUrlByShortUrl, findUrlById, findUrlByShortUrl, findUrlsByUserId, updateUrl } from "../services/url.services.js";
import { generateShortId } from "../utils/nanoid.js";
import { urlShortenSchema } from "../validations/request.validation.js";

export const shortenController = async (req, res) => {
    try {
        const validation = await urlShortenSchema.safeParseAsync(req.body);

        if (!validation.success) {
            return res.status(400).json({ success: false, message: "Validation failed", errors: validation.error.message });
        }

        let { longUrl, shortUrl } = validation.data;

        if (!shortUrl) {
            shortUrl = await generateShortId();
        }

        const url = await findUrlByShortUrl(shortUrl);

        if (url) {
            return res.status(400).json({ success: false, message: "Short URL already exists" });
        }

        const response = await createUrl(shortUrl, longUrl, req.user.id);

        return res.status(201).json({
            success: true,
            message: "URL shortened successfully",
            data: response
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const redirectController = async (req, res) => {
    const { shortUrl } = req.params;

    if (!shortUrl) {
        return res.status(400).json({ success: false, message: "Short URL is required" });
    }

    const url = await findUrlByShortUrl(shortUrl);

    if (!url) {
        return res.status(404).json({ success: false, message: `${shortUrl} not found` });
    }

    return res.redirect(url.longUrl);
}

export const getCodesController = async (req, res) => {
    try {
        const urls = await findUrlsByUserId(req.user.id);

        if (urls.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No URL codes generated yet",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "URL codes fetched successfully",
            data: urls
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteCodeController = async (req, res) => {
    const { shortUrl } = req.params;

    if (!shortUrl) {
        return res.status(400).json({ success: false, message: "Short URL is required" });
    }

    await deleteUrlByShortUrl(shortUrl, req.user.id);

    return res.status(200).json({
        success: true,
        message: "URL code deleted successfully"
    });
}

export const updateUrlController = async (req, res) => {
    const { id } = req.params;
    const { shortUrl, longUrl } = req.body;

    if (!shortUrl || !longUrl) {
        return res.status(400).json({ success: false, message: "Short URL and Long URL are required" });
    }

    const url = await findUrlById(id, req.user.id);

    if (!url) {
        return res.status(404).json({ success: false, message: `URL not found` });
    }

    const response = await updateUrl(id, shortUrl, longUrl, req.user.id);

    return res.status(200).json({
        success: true,
        message: "URL code updated successfully",
        data: response
    });
}