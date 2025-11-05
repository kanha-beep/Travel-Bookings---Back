import jwt from 'jsonwebtoken';
export const VerifyAuth = (req, res, next) => {
    // console.log("verify auth starts")
    const token = req.cookies?.cookie || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
    console.log("got token", token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "travel");
        req.user = decoded;
        // console.log("decoded: ", req.user?.role)
        next()
    } catch (e) {
        console.log("error in verify auth: ", e)
        return res.status(401).json({ message: "Invalid token" });
    }

}