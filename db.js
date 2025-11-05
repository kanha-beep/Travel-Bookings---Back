import mongoose from "mongoose"
import { User } from "./models/auth.models.js"
import { Slot } from "./models/slots.models.js"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/travel")
        // Slot.deleteMany().then(() => {
        //     console.log("All users deleted")
        // })
    } catch (e) {
        console.log("Error in DB connection: ", e)
    }
}