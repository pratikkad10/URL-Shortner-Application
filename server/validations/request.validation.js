import { z } from "zod";

export const userRegistrationSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().optional(),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const userLoginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const urlShortenSchema = z.object({
    longUrl: z.string().url("Invalid URL"),
});