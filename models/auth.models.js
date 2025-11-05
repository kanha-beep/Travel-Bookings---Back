import mongoose from "mongoose"
import { AuthSchema } from "../schemas/AuthSchema.js"
import bcrypt from "bcryptjs"
AuthSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
        this.confirmPassword = undefined
    }
    next()
})
AuthSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
export const User = mongoose.model("User", AuthSchema)