import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import expertRoutes from "./routes/expertRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

// Connect Database
connectDB();

const app = express();

/* =========================
   CORS CONFIGURATION
========================= */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://expert-booking-frontend-ebon.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());

/* =========================
   DEBUG LOGS
========================= */
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

/* =========================
   ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/experts", expertRoutes);
app.use("/api/bookings", bookingRoutes);

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("API Running...");
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});