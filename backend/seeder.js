import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";

//personal route
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
//personal route


dotenv.config();

connectDB();

const importData = async () => {
    try {
        // Delete all products
        await Product.deleteMany();
        console.log("Products removed");

        // Find the Admin user
        const adminUser = await User.findOne({ isAdmin: true });

        if (!adminUser) {
            console.log("Admin user not found");
            process.exit(1);
        }

        // Get the products from the API 
        console.log("Importing products...");
        const { data } = await axios.get("https://fakestoreapi.com/products");


        // Adapting the dates from API to matching with (Mapping) Schema
        const sampleProducts = data.map((product) => {
            return {
                user: adminUser._id,
                name: product.title,
                image: product.image,
                brand: "FakeStore",
                category: product.category,
                description: product.description,
                price: product.price,
                countInStock: 10,
                rating: product.rating.rate,
                numReviews: product.rating.count,
            };
        });


        // Insert all in MongoDB
        await Product.insertMany(sampleProducts);

        console.log("Products was imported successfully");
        process.exit();
    } catch (error) {
        console.error(`Error to import:  ${error.message}`);
        process.exit(1);
    }



};



const destroyData = async () => {
    try {
        await Cart.deleteMany();
        console.log("Products removed");
        process.exit();
    } catch (error) {
        console.error(`Error to destroy:  ${error.message}`);
        process.exit(1);
    }
};


// Logic to import or delete data
if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}


