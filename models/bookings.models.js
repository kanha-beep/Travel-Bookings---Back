import mongoose from "mongoose"
import { BookingsSchema } from "../schemas/BookingsSchema.js"
export const Booking = mongoose.model("Booking", BookingsSchema)