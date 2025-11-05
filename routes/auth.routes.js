import express from "express"
const router = express.Router()
// api/auth
import { IsRole } from "../middlewares/IsRole.js"
import { VerifyAuth } from "../middlewares/VerifyAuth.js"
import { registerUser, loginUser, registerOwner, loginOwner, currentUser } from "../controllers/auth.controllers.js"
router.post("/user/register", registerUser)
router.post("/user/login", loginUser)
router.post("/owner/register", registerOwner)
router.post("/owner/login", loginOwner)
router.get("/me", VerifyAuth, IsRole("owner", "user"), currentUser)
export default router