import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import bcrypt from "bcryptjs";

//personal route
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
//personal route


dotenv.config();

const app = express();
app.use(express.json());


app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password }); // create a new user
        await newUser.save(); // save the user to the database, here is activate the new user + pass scrypt


        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post("/login", async (req, res) => {
    try {
        const { email, password, } = req.body;

        const user = await User.findOne({ email });
        // verify if user already exist in database
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // verify if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // if all is ok, return to user
        res.status(200).json({
            message: "Login successful!",
            user: { id: user._id, username: user.username, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Connected to MongoDB using .env variable
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(" Connected to MongoDB successfully"))
    .catch((err) => console.error(" MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
    res.send("The server running and listening successfully");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});


