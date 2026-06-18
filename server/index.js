import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRoutes from "./routes/user.routes.js";
import urlRoutes from "./routes/url.routes.js";
import { authMiddleware } from './middleware/auth.middleware.js';
import { redirectController } from "./controllers/url.controller.js";
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
  origin: true,
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

app.get("/:shortUrl", redirectController);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});