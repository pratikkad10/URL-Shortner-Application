import { createUrl } from "../services/url.services.js";
import { generateShortId } from "../utils/nanoid.js";
import { urlShortenSchema } from "../validations/request.validation.js";

export const shortenController = async (req, res) => {
    try {

        if (!req.user?.id) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        const validation = await urlShortenSchema.safeParseAsync(req.body);

        if (!validation.success) {
            return res.status(400).json({ success: false, message: "Validation failed", errors: validation.error.message });
        }

        const { longUrl } = validation.data;

        const shortUrl = await generateShortId();

        const response = await createUrl(shortUrl, longUrl, req.user?.id);

        return res.status(200).json({
            success: true,
            message: "URL shortened successfully",
            data: response
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}