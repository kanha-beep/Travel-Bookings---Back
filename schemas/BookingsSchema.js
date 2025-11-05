import mongoose from "mongoose";

export const BookingsSchema = new mongoose.Schema({
    members: {
        type: Number,
        required: true
    },
    checkIn: {
        type: Date,
        default: Date.now
    },
    checkOut: {
        type: Date,
        default: Date.now
    },
    number: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slot"
    }
}, { strict: false })