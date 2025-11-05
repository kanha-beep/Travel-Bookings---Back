import { Booking } from "../models/bookings.models.js"
import { ExpressError } from "../middlewares/ExpressError.js"
import { Slot } from "../models/slots.models.js";
export const newBookings = async (req, res, next) => {
    console.log("bookings start")
    const { checkIn, checkOut, members, number, slotsId } = req.body;
    console.log("slot id: ", slotsId)
    // const slots = await Slot.findById(slotsId)
    // console.log("slots: ", slots)
    if (!checkIn || !checkOut || !members || !number) return next(new ErrorHandler(400, "Please fill all the fields"))
    console.log("all details for booking: ", checkIn, checkOut, members, number)
    const bookings = await Booking.create({
        checkIn, checkOut, members, number, user: req.user._id, slot: slotsId
    })
    await Slot.findByIdAndUpdate(slotsId, { $push: { bookings: bookings._id } })
    if (!bookings) return next(new ErrorHandler(400, "Error in booking"))
    console.log("bookings end: ", bookings);
    res.status(200).json({
        success: true,
        bookings
    })
}
export const allBookings = async (req, res, next) => {
    const bookings = await Booking.find({ user: req.user._id })
    if (!bookings) return next(new ExpressError(400, "Error in getting bookings"))
    console.log("all bookings end: ", bookings);
    const myAllBookings = await Booking.countDocuments({ user: req.user._id })
    if (!myAllBookings) return next(new ExpressError(400, "Error in getting bookings"))
    console.log("myAllBookings end: ", myAllBookings);
    res.status(200).json({
        success: true,
        bookings,
        myAllBookings
    })
}
export const userDashboard = async (req, res, next) => {
    const totalBookings = await Booking.countDocuments({ user: req.user._id })
    if (!totalBookings) return next(new ExpressError(400, "Error in getting bookings"))
    console.log("myBookings end: ", totalBookings);
    res.status(200).json({
        success: true,
        totalBookings
    })
}