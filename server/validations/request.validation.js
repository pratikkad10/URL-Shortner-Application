import { z } from "zod";

export const userRegistrationSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().optional(),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
});

export const userLoginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const urlShortenSchema = z.object({
    longUrl: z.string().url("Invalid URL"),
    shortUrl: z.string().optional(),
    expiresAt: z.string().optional().nullable(),
    utmSource: z.string().optional().nullable(),
    utmMedium: z.string().optional().nullable(),
    utmCampaign: z.string().optional().nullable(),
});

export const resetPasswordSchema = z.object({
    oldPassword: z.string().min(8, "Password must be at least 8 characters long"),
    newPassword: z.string().min(8, "Password must be at least 8 characters long"),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export const resetPasswordWithOtpSchema = z.object({
    email: z.string().email("Invalid email address"),
    otp: z.string().length(6, "OTP must be exactly 6 digits"),
    newPassword: z.string().min(8, "Password must be at least 8 characters long"),
});

export const updateProfileSchema = z.object({
    firstName: z.string().min(1, "First name is required").max(255).optional(),
    lastName: z.string().max(255).optional(),
});