import express from "express"
const router = express.Router()
// /api/bookings
import { IsRole } from "../middlewares/IsRole.js"
import { newBookings, allBookings, userDashboard } from "../controllers/bookings.controller.js"
import { WrapAsync } from "../middlewares/WrapAsync.js"
import { VerifyAuth } from "../middlewares/VerifyAuth.js"
router.post("/new", VerifyAuth, WrapAsync(newBookings))
router.get("/", VerifyAuth, WrapAsync(allBookings))
router.get("/dashboard/user", VerifyAuth, IsRole("user"), WrapAsync(userDashboard))
export default router