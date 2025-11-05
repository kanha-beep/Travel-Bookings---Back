import mongoose from "mongoose";

export const AuthSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
    },
    role: {
        type: String,
        enum:["owner", "user"],
        default: "user"
    }
}, { strict: false })