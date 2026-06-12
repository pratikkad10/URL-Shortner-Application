import { createUser, getUserByEmail } from "../services/user.services.js";
import { userRegistrationSchema, userLoginSchema } from "../validations/request.validation.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import { generateUserToken } from "../utils/token.js";

export const registerUser = async (req, res) => {
    const validation = userRegistrationSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ success: false, message: "Validation failed", errors: validation.error.message });
    }

    const { firstName, lastName, email, password } = validation.data;

    try {
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ success: false, message: `User with email ${email} already exists` });
        }

        const hashedPassword = await hashPassword(password);

        const user = await createUser(firstName, lastName, email, hashedPassword);

        res.status(201).json({ success: true, data: { userId: user.id }, message: "User registered successfully" });

    } catch (error) {
        console.log("Error in register user controller:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const loginUser = async (req, res) => {
    const validation = userLoginSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ success: false, message: "Validation failed", errors: validation.error.message });
    }

    const { email, password } = validation.data;

    try {
        const user = await getUserByEmail(email, { includePassword: true });

        if (!user) {
            return res.status(404).json({ success: false, message: `User with email ${email} not found` });
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const payload = {
            id: user.id
        };

        const token = await generateUserToken(payload);

        if (!token) {
            return res.status(400).json({ success: false, message: "Token generation failed" });
        }

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7
        });

        res.status(200).json({ success: true, data: { userId: user.id }, message: `User with email ${email} logged in successfully` });
    } catch (error) {
        console.log("Error in login user controller:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        console.log("Error in logout user controller:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
