import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRoutes from "./routes/user.routes.js";
import urlRoutes from "./routes/url.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import { authMiddleware } from './middleware/auth.middleware.js';
import { redirectController } from "./controllers/url.controller.js";
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/url", urlRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/payment", paymentRoutes);

app.get("/:shortUrl", redirectController);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});