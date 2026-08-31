export const isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access Denied! Only for Admins" });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
