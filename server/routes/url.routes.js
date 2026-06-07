import express from "express";
import {
    shortenController,
    redirectController,
    getCodesController,
    updateUrlController,
    deleteCodeController
} from "../controllers/url.controller.js";
import { ensureAuthMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/shorten", ensureAuthMiddleware, shortenController);
router.get("/codes", ensureAuthMiddleware, getCodesController);
router.put("/update/:id", ensureAuthMiddleware, updateUrlController);
router.delete("/delete/:shortUrl", ensureAuthMiddleware, deleteCodeController);
router.get("/:shortUrl", redirectController);

export default router;