import { Slot } from "../models/slots.models.js"
import { ExpressError } from "../middlewares/ExpressError.js"
export const allSlots = async (req, res, next) => {
    // console.log("all sorts started")
    const slots = await Slot.find({})
    // console.log("all slots: ", slots)
    if (!slots) return next(new ExpressError(404, "No slots found",));
    res.status(200).json({ message: "All slots", slots })
}
export const newSlots = async (req, res, next) => {
    // console.log("new slots started")
    // console.log("new slots images: ", req.files)
    const images = req.files.map((file) => file.filename);
    const { title, price, food, location, description, number } = req.body
    const slots = await Slot.create({ title, price, food, location, description, number, owner: req.user._id, images: images })
    if (!slots) return next(new ExpressError(404, "No slots found",));
    // console.log("new slots: ", slots)
    res.status(200).json({ message: "New slots created", slots, owner: req.user._id })
}
export const oneSlots = async (req, res, next) => {
    const { id } = req.params
    const slots = await Slot.findById(id).populate("owner")
    if (!slots) return next(new ExpressError(404, "No slots found",));
    // console.log("one slots: ", slots)
    res.status(200).json({ message: "One slots", slots })
}
export const editSlots = async (req, res, next) => {
    const { id } = req.params
    const slots = await Slot.findById(id)
    if (!slots) return next(new ExpressError(404, "No slots found",));
    console.log("edit slots: ", slots)
    res.status(200).json({ message: "Edit slots", slots })
}
export const updateSlots = async (req, res, next) => {
    const { id } = req.params
    // console.log("update images: ", req.files)
    const images = req.files.map((file) => file.filename);
    console.log("update images: ", images)
    const { title, price, food, location, description, number } = req.body;
    const slots = await Slot.findByIdAndUpdate(id, { title, price, food, location, description, number, images })
    if (!slots) return next(new ExpressError(404, "No slots found",));
    console.log("update slots: ", slots)
    res.status(200).json({ message: "Update slots", slots })
}
export const deleteSlots = async (req, res, next) => {
    const { id } = req.params
    const slots = await Slot.findByIdAndDelete(id)
    if (!slots) return next(new ExpressError(404, "No slots found",));
    console.log("delete slots: ", slots)
    res.status(200).json({ message: "Delete slots", slots })
}
export const ownerDashboard = async (req, res, next) => {
    const slots = await Slot.findOne({ owner: req.user._id })
    const countBookings = slots.bookings.length
    if (!slots) return next(new ExpressError(404, "No slots found",));
    // console.log("owner dashboard: ", slots)
    // const Bookings = await Slot.aggregate([
    //     {
    //         $match: { owner: req.user._id }
    //     },
    //     {
    //         $lookup: {
    //             from: "bookings",
    //             localField: "_id",
    //             foreignField: "slot",
    //             as: "bookings"
    //         }
    //     },
    //     {
    //         $project: {
    //             _id: 1,
    //             title: 1,
    //             price: 1,
    //             food: 1,
    //             location: 1,
    //             description: 1,
    //             number: 1,
    //             images: 1,
    //             owner: 1,
    //             totalBookings: { $size: "$bookings" }
    //         }
    //     }
    // ])
    // console.log("owner dashboard: ", Bookings)
    // const totalBookings = Bookings.reduce(
    //     (acc, slot) => acc + slot.totalBookings,
    //     0
    // );
    console.log("count bookings: ", countBookings)
    res.status(200).json({ message: "Owner dashboard", slots, countBookings })
}