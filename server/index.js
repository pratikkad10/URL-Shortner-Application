import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRoutes from "./routes/user.routes.js";
import { authMiddleware } from './middleware/auth.middleware.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/api/v1/user", userRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});