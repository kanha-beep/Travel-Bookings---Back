import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import { connectDB } from "./db.js"
import authRoutes from "./routes/auth.routes.js"
import slotRoutes from "./routes/slot.routes.js"
import bookingRoutes from "./routes/booking.routes.js"
import { fileURLToPath } from "url";

import path from "path"
const app = express();
dotenv.config();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json())
connectDB()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use("/auth", authRoutes)
app.use("/slots", slotRoutes)
app.use("/bookings", bookingRoutes)
app.get("/", (req, res) => {
  res.send("Hello World")
})
app.use((err, req, res, next) => {
  console.error("Error in app.js:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});
export default app