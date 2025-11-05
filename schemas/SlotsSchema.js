import mongoose from "mongoose";

export const SlotsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    Images: {
        type: String,
    },
    food: {
        type: String,
    },
    price: {
        type: String,
    },
    number: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    }]
}, { strict: false })