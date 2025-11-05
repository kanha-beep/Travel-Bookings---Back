import mongoose from "mongoose"
import { SlotsSchema } from "../schemas/SlotsSchema.js"
export const Slot = mongoose.model("Slot", SlotsSchema)