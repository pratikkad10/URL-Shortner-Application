import express from "express";
import { getDashboardStatsController } from "../controllers/analytics.controller.js";
import { ensureAuthMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/dashboard", ensureAuthMiddleware, getDashboardStatsController);

export default router;
