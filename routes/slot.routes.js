import express from "express"
const router = express.Router()
import { IsRole } from "../middlewares/IsRole.js"
import { uploads } from "../middlewares/Multer.js"
import { allSlots, newSlots, oneSlots, editSlots, updateSlots, deleteSlots, ownerDashboard } from "../controllers/slots.controllers.js"
import { VerifyAuth } from "../middlewares/VerifyAuth.js"
import { WrapAsync } from "../middlewares/WrapAsync.js"
router.get("/all-slots", VerifyAuth, WrapAsync(allSlots))
router.post("/new", VerifyAuth, uploads.array("images", 5), IsRole("owner"), WrapAsync(newSlots))
router.get("/single-slots/:id", VerifyAuth, IsRole("owner", "user"), WrapAsync(oneSlots))
router.get("/:id/edit", VerifyAuth, IsRole("owner"), WrapAsync(editSlots))
router.patch("/:id/edit", VerifyAuth, uploads.array("images", 5), IsRole("owner"), WrapAsync(updateSlots))
router.delete("/:id/delete", VerifyAuth, IsRole("owner"), WrapAsync(deleteSlots))
router.get("/dashboard/owner", VerifyAuth, IsRole("owner"), WrapAsync(ownerDashboard))
export default router