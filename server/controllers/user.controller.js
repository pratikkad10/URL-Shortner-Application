
import db from "../db.js"
import { usersTable } from "../models/user.model.js"
import { userRegistrationSchema, userLoginSchema } from "../validations/request.validation.js";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const validation = userRegistrationSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ success: false, message: "Validation failed", errors: validation.error.message });
    }

    const { firstName, lastName, email, password } = validation.data;

    try {
        const [existingUser] = await db.select().from(usersTable).where(eq(usersTable.email, email));

        if (existingUser) {
            return res.status(400).json({ success: false, message: `User with email ${email} already exists` });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [user] = await db.insert(usersTable).values({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        }).returning({ id: usersTable.id });

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
        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));

        if (!user) {
            return res.status(404).json({ success: false, message: `User with email ${email} not found` });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        res.status(200).json({ success: true, data: { userId: user.id }, message: `User with email ${email} logged in successfully` });
    } catch (error) {
        console.log("Error in login user controller:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
