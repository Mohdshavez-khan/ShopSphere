import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "You are not Logged in please Login first" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(req.user)
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};

