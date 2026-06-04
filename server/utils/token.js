import jwt from "jsonwebtoken";
import { userTokenSchema } from "../validations/token.validation.js";


export const generateUserToken = async (payload) => {
    const validation = await userTokenSchema.safeParseAsync(payload);

    if (!validation.success) {
        return res.status(400).json({ success: false, message: "Validation failed", errors: validation.error.message });
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
}

export const verifyUserToken = async (token) => {
    try {
        const validation = await userTokenSchema.safeParseAsync(token);

        if (!validation.success) {
            return res.status(400).json({ success: false, message: "Validation failed", errors: validation.error.message });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken;
    } catch (error) {
        console.log("Error in token verification:", error);
        return null;
    }
}