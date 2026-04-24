import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import cartRoutes from "./routes/cartRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";



//personal route
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
//personal route

dotenv.config();


// connected to MongoDB
connectDB();

const app = express();

app.use(cors());

//Middleware for json in body
app.use(express.json());

app.get("/", (req, res) => {
    res.send("The server running and listening successfully");
});




// API routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
// API routes



// Middleware for errors
app.use(notFound);
app.use(errorHandler);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});









