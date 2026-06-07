import express from "express";
import { shortenController } from "../controllers/url.controller.js";
import { ensureAuthMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/shorten", ensureAuthMiddleware, shortenController);

export default router;