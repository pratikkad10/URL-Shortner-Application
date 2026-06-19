import { createUrl, deleteUrlByShortUrl, findUrlById, findUrlByShortUrl, findUrlsByUserId, updateUrl, logClick } from "../services/url.services.js";
import { generateShortId } from "../utils/nanoid.js";
import { urlShortenSchema } from "../validations/request.validation.js";
import geoip from 'geoip-lite';

export const shortenController = async (req, res) => {
    try {
        const validation = await urlShortenSchema.safeParseAsync(req.body);

        if (!validation.success) {
            return res.status(400).json({ success: false, message: "Validation failed", errors: validation.error.message });
        }

        let { longUrl, shortUrl, expiresAt, utmSource, utmMedium, utmCampaign } = validation.data;

        if (utmSource || utmMedium || utmCampaign) {
            try {
                const urlObj = new URL(longUrl);
                if (utmSource) urlObj.searchParams.set('utm_source', utmSource);
                if (utmMedium) urlObj.searchParams.set('utm_medium', utmMedium);
                if (utmCampaign) urlObj.searchParams.set('utm_campaign', utmCampaign);
                longUrl = urlObj.toString();
            } catch (e) {
                console.error("Error appending UTMs", e);
            }
        }

        if (!shortUrl) {
            shortUrl = await generateShortId();
        }

        const url = await findUrlByShortUrl(shortUrl);

        if (url) {
            return res.status(400).json({ success: false, message: "Short URL already exists" });
        }

        const response = await createUrl(shortUrl, longUrl, req.user.id, expiresAt);

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

    if (url.expiresAt && new Date() > new Date(url.expiresAt)) {
        return res.status(410).json({ success: false, message: "This link has expired" });
    }
    
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // For local testing, mock a public IP if it's a loopback address
    if (ip === '::1' || ip === '127.0.0.1') {
        const mockIps = ['8.8.8.8', '82.163.127.255', '212.58.246.103', '103.208.73.1']; // US, FR, GB, AU
        ip = mockIps[Math.floor(Math.random() * mockIps.length)];
    }

    const geo = geoip.lookup(ip);
    const country = geo ? geo.country : 'Unknown';
    const city = geo ? geo.city : 'Unknown';

    logClick(url.id, ip, req.get('Referer') || null, req.headers['user-agent'] || null, country, city)
        .catch(err => console.error('Failed to log click:', err));

    return res.redirect(url.longUrl);
}

export const getCodesController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const result = await findUrlsByUserId(req.user.id, page, limit);

        if (result.items.length === 0 && page === 1) {
            return res.status(200).json({
                success: true,
                message: "No URL codes generated yet",
                data: {
                    items: [],
                    pagination: result.pagination
                }
            });
        }

        return res.status(200).json({
            success: true,
            message: "URL codes fetched successfully",
            data: result
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