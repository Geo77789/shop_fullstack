import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";



// User login
export const authUser = async (req, res) => {
    try {
        const { email, password, } = req.body;
        // find the user by email
        const user = await User.findOne({ email });
        // if user exist / check the password if match with user
        // use && to check the both conditions
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                token: generateToken(user._id),
            });
        } else {
            // user not found or password / email incorrect
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

//Admin login
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });

        }

        const user = await User.create({ username, email, password });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};




export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.address = req.body.address || user.address;

        const updateUser = await user.save();

        res.json(updateUser);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});




