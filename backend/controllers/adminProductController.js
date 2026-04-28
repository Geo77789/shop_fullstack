import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";



// @desc Create new product
// @ POST / api/products
// @access Private/Admin

export const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = new Product({
        name: name || "New Name",
        price: price || 0,
        user: req.user._id, // get from middleware "protect"
        image: image || "/image/sample.jpg",
        brand: brand || "Brand",
        category: category || "Categories",
        description: description || "Description product",
        countInStock: countInStock || 0,
    });
    const createProduct = await product.save();
    res.status(201).json(createProduct);
});



// @ Update product
// @ PUT / api/products/:id
// @access Private/Admin



export const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name ?? product.name;
        product.price = price ?? product.price;
        product.description = description ?? product.description;
        product.image = image ?? product.image;
        product.brand = brand ?? product.brand;
        product.category = category ?? product.category;
        product.countInStock = countInStock ?? product.countInStock;

        const updateProduct = await product.save();
        res.json(updateProduct);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});



// @ Delete product
// @ DELETE / api/products/:id
// @access Private/Admin

export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);


    if (product) {
        await product.deleteOne();
        res.json({ message: "Product removed" });
    } else {
        res.status(404).json({ message: "Product not found" });
    }

});



// Admin Summary

export const getAdminSummary = asyncHandler(async (req, res) => {
    const products = await Product.find({}).select("price countInStock");
    // const users = await User.find({});
    const userCount = await User.countDocuments(); // total number of users

    // calculate total stock
    const totalStock = products.reduce((acc, item) => acc + item.countInStock, 0);
    const totalValue = products.reduce((acc, item) => acc + (item.price * item.countInStock), 0);


    res.json({
        totalProducts: products.length,
        totalStock,
        totalValue,
        userCount,
        numSales: 0, // total number of sales, will be make it when we have ordersModel
        totalSales: 0 // total number of sales, will be make it when we have ordersModel
    });

});


