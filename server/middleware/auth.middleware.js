import { verifyUserToken } from "../utils/token.js";

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) return next();

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token format, Authorization header must start with Bearer <token>" });
    }

    const [_, token] = authHeader.split(" "); // ["Bearer", "token"]

    try {
        const decodedToken = await verifyUserToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.log("Error in auth middleware:", error);
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
}