import express from "express";
import { getDashboardStatsController, getLinkAnalyticsController } from "../controllers/analytics.controller.js";
import { ensureAuthMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/dashboard", ensureAuthMiddleware, getDashboardStatsController);
router.get("/link/:shortUrl", ensureAuthMiddleware, getLinkAnalyticsController);

export default router;
