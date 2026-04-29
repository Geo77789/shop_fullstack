import asyncHandler from "express-async-handler";
import Order from "../models/orderModels.js";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";



// Create new order
// POST /api/orders
// Private

export const createOrder = asyncHandler(async (req, res) => {
    const userId = req.user._id;




    // Find the user card by id
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
        res.status(400);
        throw new Error("No order items (cart is empty)");
    }



    // Create order items from cart items
    const orderItems = cart.items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        image: item.product.image,
        price: item.product.price,
        product: item.product._id,
    }));


    // Calculate the total price
    const totalPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Create order in DB
    const order = new Order({
        user: userId,
        OrderItems: orderItems,
        totalPrice,
    });

    const createdOrder = await order.save();


    // Refresh the stock for each product
    for (const item of orderItems) {
        const product = await Product.findById(item.product);
        if (product) {
            product.countInStock -= item.quantity;
            await product.save();
        }
    }


    // Empty cart after order was placed
    await Cart.findOneAndDelete({ user: userId });


    // Return the created order
    res.status(201).json(createdOrder);
});


// Get order by ID
// Get /api/orders/:id
// Private

export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "username email");

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});



// Get logged in user orders
// Get /api/orders/myorders
// Private

export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});



export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "id username");
    res.json(orders);
})


export const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = "Delivered";
        // order.deliveredAt = Date.now(); // Set the delivery date

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
})