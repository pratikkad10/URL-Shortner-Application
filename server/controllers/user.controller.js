import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "../services/user.services.js";
import { userRegistrationSchema, userLoginSchema } from "../validations/request.validation.js";

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

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser(firstName, lastName, email, hashedPassword);

        const payload = {
            id: user.id,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ success: true, data: { userId: user.id, token }, message: "User registered successfully" });

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
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ success: false, message: `User with email ${email} not found` });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const payload = {
            id: user.id
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ success: true, data: { userId: user.id, token }, message: `User with email ${email} logged in successfully` });
    } catch (error) {
        console.log("Error in login user controller:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
