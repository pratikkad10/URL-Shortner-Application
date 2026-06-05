import express from "express";
import { shortenController } from "../controllers/url.controller.js";

const router = express.Router();

router.post("/shorten", shortenController);

export default router;