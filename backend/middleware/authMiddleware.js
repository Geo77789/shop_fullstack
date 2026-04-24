import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


export const protect = async (req, res, next) => {
    let token;


    // 1. Verify if token exit in Header (send it as "Bearer <token>")
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {

            // get token from header without word "Bearer"
            token = req.headers.authorization.split(" ")[1];

            // 2. Decode the token using the secret from .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET);


            // 3. Search the user in the DB after the ID in the token and add in object
            // Using .select("-password") to don't send the password in the response

            req.user = await User.findById(decoded.id).select("-password");

            next(); // All is ok, go to next middleware (controller)
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: "Not authorized" });
        }
    }
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};



// Logic for Admin
export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({ message: "Your not admin" });
    }
};