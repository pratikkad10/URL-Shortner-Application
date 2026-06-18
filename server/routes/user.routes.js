import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    resetPassword,
    verifyEmail,
    forgotPassword,
    resetPasswordWithOtp
} from "../controllers/user.controller.js";
import { authMiddleware, ensureAuthMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password-with-otp", resetPasswordWithOtp);

// Protected routes (require user to be logged in)
router.post("/logout", authMiddleware, ensureAuthMiddleware, logoutUser);
router.get("/me", authMiddleware, ensureAuthMiddleware, getCurrentUser);
router.post("/reset-password", authMiddleware, ensureAuthMiddleware, resetPassword);

export default router;