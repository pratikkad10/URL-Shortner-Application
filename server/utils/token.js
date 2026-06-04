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