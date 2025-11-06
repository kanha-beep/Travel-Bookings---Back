import { ExpressError } from '../middlewares/ExpressError.js'
import { User } from "../models/auth.models.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export const registerUser = async (req, res, next) => {
    // console.log("register starts")
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) return next(new ExpressError(400, "Please fill all the fields"))
    // console.log("register details: ", name, email, password, confirmPassword)
    const existing = await User.findOne({ email });
    // console.log("existing user: ", existing)
    if (existing) return next(new ExpressError(400, "User already exists"))
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword , role: "user"});
    // console.log("registered: ", user)
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET || "travel", { expiresIn: '1d' })
    res.status(201).json({ message: "User created successfully", token })
}
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new ExpressError(400, "Please fill all the fields"))
    const user = await User.findOne({ email });
    if (!user) return next(new ExpressError(400, "User does not exist"))
    console.log("user found: ", user)
    const isMatch = user.comparePassword(password);
    if (!isMatch) return next(new ExpressError(400, "Invalid credentials"))
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET || "travel", { expiresIn: '1d' })
    // console.log("login token: ", token)
    res.cookie("cookie", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }).status(200).json({ message: "User logged in successfully", token, user: { _id: user._id, name: user.name, email: user.email } })
}
export const registerOwner = async (req, res, next) => {
    // console.log("register starts")
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) return next(new ExpressError(400, "Please fill all the fields"))
    // console.log("register details: ", name, email, password, confirmPassword)
    const existing = await User.findOne({ email });
    // console.log("existing user: ", existing)
    if (existing) return next(new ExpressError(400, "User already exists"))
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword, role: "owner" });
    // console.log("register owner: ", user)
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET || "travel", { expiresIn: '1d' })
    res.status(201).json({ message: "Owner created successfully", token })
}
export const loginOwner = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new ExpressError(400, "Please fill all the fields"))
    const user = await User.findOne({ email });
    if (!user) return next(new ExpressError(400, "User does not exist"))
    // console.log("owner found: ", user)
    const isMatch = user.comparePassword(password);
    if (!isMatch) return next(new ExpressError(400, "Invalid credentials"))
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET || "travel", { expiresIn: '1d' })
    // console.log("login token: ", token)
    res.cookie("cookie", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }).status(200).json({ message: "Owner logged in successfully", token, user: { _id: user._id, name: user.name, email: user.email } })
}
export const currentUser = async (req, res, next) => {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return next(new ExpressError(400, "User does not exist"))
    console.log("current user: ", user)
    res.status(200).json({ message: "User found", user })
}