import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import { connectDB } from "./db.js"
import authRoutes from "./routes/auth.routes.js"
import slotRoutes from "./routes/slot.routes.js"
import bookingRoutes from "./routes/booking.routes.js"
import { fileURLToPath } from "url";
dotenv.config();
import path from "path"
const FRONTEND_URL = process.env.FRONTEND_URL
if (!FRONTEND_URL) {
  console.error("❌ FRONTEND_URL is NOT defined in .env file");
} else {
  console.log("✅ FRONTEND_URL loaded:", FRONTEND_URL);
}const app = express();
app.use(cors({
  origin: FRONTEND_URL,
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