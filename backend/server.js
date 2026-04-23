import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

//personal route
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
//personal route

dotenv.config();

// connected to MongoDB
connectDB();

const app = express();

//Middleware for json in body
app.use(express.json());

// API routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
// API routes

app.get("/", (req, res) => {
    res.send("The server running and listening successfully");
});


const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});






