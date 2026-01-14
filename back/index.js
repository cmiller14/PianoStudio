import express from "express";
import cors from "cors";

import messageRoutes from "./server/routes/messages.js";
import authRoutes from "./server/routes/auth.js";
import userRoutes from "./server/routes/users.js";
import scheduleRoutes from "./server/routes/schedule.js";
import newsRoutes from "./server/routes/news.js";

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
].filter(Boolean);

app.set("trust proxy", 1);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      console.warn("Blocked CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/news", newsRoutes);

export default async function handler(req, res) {
  return new Promise((resolve) => {
    app(req, res, () => {
      res.statusCode = 404;
      res.end("Route not found");
      resolve();
    });
  });
}





