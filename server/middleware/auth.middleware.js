import { verifyUserToken } from "../utils/token.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) return next();

    try {
        const decodedToken = await verifyUserToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.log("Error in auth middleware:", error);
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
}

export const ensureAuthMiddleware = (req, res, next) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ success: false, message: "Unauthorized: Please Login" });
    }
    next();
}