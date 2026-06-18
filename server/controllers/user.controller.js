import { createUser, getUserByEmail, updateUser, getUserById, getUserByVerificationToken } from "../services/user.services.js";
import { userRegistrationSchema, userLoginSchema, resetPasswordSchema, forgotPasswordSchema, resetPasswordWithOtpSchema } from "../validations/request.validation.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import { generateUserToken } from "../utils/token.js";
import { sendVerificationEmail, sendPasswordResetOtpEmail } from "../services/mail.service.js";
import { nanoid } from "nanoid";


export const registerUser = async (req, res) => {
    const validation = userRegistrationSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ success: false, message: "Validation failed", errors: validation.error.message });
    }

    const { firstName, lastName, email, password, termsAccepted } = validation.data;

    try {
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ success: false, message: `User with email ${email} already exists` });
        }

        const hashedPassword = await hashPassword(password);

        const verificationToken = nanoid(32);

        const user = await createUser(firstName, lastName, email, hashedPassword, verificationToken, termsAccepted);

        const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${verificationToken}`;

        if (user) {
            await sendVerificationEmail(email, verificationLink);
        }

        console.log("Verification link:", verificationLink);

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

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await getUserById(userId, { includePassword: false });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, data: user, message: "User fetched successfully" });
    } catch (error) {
        console.log("Error in get current user controller:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;

        const validation = await resetPasswordSchema.safeParseAsync(req.body);

        if (!validation.success) {
            return res.status(400).json({ success: false, message: "Validation failed", errors: validation.error.message });
        }

        if (oldPassword === newPassword) {
            return res.status(400).json({ success: false, message: "New password cannot be same as old password" });
        }

        const user = await getUserById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: `User with ID ${userId} not found` });
        }

        if (!user.isVerified) {
            return res.status(400).json({ success: false, message: "User is not verified" });
        }

        const isPasswordValid = await comparePassword(oldPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid old password" });
        }

        const hashedPassword = await hashPassword(newPassword);

        const updatedUser = await updateUser(userId, { password: hashedPassword });

        res.status(200).json({ success: true, data: updatedUser, message: "Password reset successfully" });

    } catch (error) {
        console.log("Error in reset password controller:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const verifyEmail = async (req, res) => {
    try {
        const verificationToken = req.params.token;

        const user = await getUserByVerificationToken(verificationToken);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ success: false, message: "User is already verified" });
        }

        const updatedUser = await updateUser(user.id, { isVerified: true, verificationToken: null });

        res.status(200).json({ success: true, data: updatedUser, message: "Email verified successfully" });
    } catch (error) {
        console.log("Error in verify email controller:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const validation = await forgotPasswordSchema.safeParseAsync(req.body);

        if (!validation.success) {
            return res.status(400).json({ success: false, message: "Validation failed", errors: validation.error.message });
        }

        const { email } = validation.data;
        const user = await getUserByEmail(email);

        if (!user) {
            // We return true anyway to prevent email enumeration attacks
            return res.status(200).json({ success: true, message: "If the email is registered, an OTP will be sent." });
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // Set expiry to 10 minutes from now
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        await updateUser(user.id, { resetPasswordOtp: otp, resetPasswordOtpExpiry: otpExpiry });
        await sendPasswordResetOtpEmail(email, otp);

        console.log("OTP sent to " + email + " with OTP : " + otp);

        res.status(200).json({ success: true, message: "If the email is registered, an OTP will be sent." });
    } catch (error) {
        console.log("Error in forgot password controller:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const resetPasswordWithOtp = async (req, res) => {
    try {
        const validation = await resetPasswordWithOtpSchema.safeParseAsync(req.body);

        if (!validation.success) {
            return res.status(400).json({ success: false, message: "Validation failed", errors: validation.error.message });
        }

        const { email, otp, newPassword } = validation.data;
        const user = await getUserByEmail(email);

        if (!user || user.resetPasswordOtp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP or Email" });
        }

        if (new Date() > new Date(user.resetPasswordOtpExpiry)) {
            return res.status(400).json({ success: false, message: "OTP has expired" });
        }

        const hashedPassword = await hashPassword(newPassword);

        // Update password and clear OTP fields
        await updateUser(user.id, {
            password: hashedPassword,
            resetPasswordOtp: null,
            resetPasswordOtpExpiry: null
        });

        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.log("Error in reset password with OTP controller:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
