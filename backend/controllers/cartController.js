import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";



// Add to cart / Update quantity
export const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body; // 'quantity' can be 1 (from Home) or 1/-1 (from Cart)
    const userId = req.user._id;

    if (!productId) {
        return res.status(400).json({ message: "productId is required" });
    }

    // 1. Check the product if exist and what is the stock
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        // If the cart doesn't exist, create a new one
        const qtyToAdd = Math.max(Number(quantity), 1);

        if (qtyToAdd > product.countInStock) {
            return res.status(400).json({ message: "Insufficient stock" });
        }

        cart = await Cart.create({
            user: userId,
            items: [{ product: productId, quantity: qtyToAdd }],
        });
    } else {
        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            // Product exist already, add to actual quantity
            const currentQty = cart.items[itemIndex].quantity;
            const newTotalQty = currentQty + Number(quantity);

            // Verify if the new total quantity is greater than stock
            if (newTotalQty > product.countInStock) {
                return res.status(400).json({
                    message: `Stock reach maximum: ${product.countInStock}`
                });
            }

            // If total quantity is 0, remove the product
            if (newTotalQty <= 0) {
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].quantity = newTotalQty;
            }
        } else {
            // New product in cart
            const qtyToAdd = Math.max(Number(quantity), 1);

            if (qtyToAdd > product.countInStock) {
                return res.status(400).json({ message: "insufficient stock" });
            }

            cart.items.push({ product: productId, quantity: qtyToAdd });
        }
        await cart.save();
    }

    // Return the updated cart for frontend
    await cart.populate("items.product");
    res.status(200).json(cart);
});

// Remove product from cart
export const deleteFromCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return res.status(200).json({ items: [] });
    }

    cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
    );

    const updatedCart = await cart.save();
    await updatedCart.populate("items.product");
    res.status(200).json(updatedCart);
});

// Get cart
export const getCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
        return res.status(200).json({ items: [] });
    }

    res.json(cart);
});



























































































// export const addToCart = asyncHandler(async (req, res) => {
//     const { productId, quantity } = req.body;
//     const userId = req.user._id;

//     // 1. Find the product in DB to check the stock
//     const product = await Product.findById(productId);
//     if (!product) {
//         return res.status(404).json({ message: "product not found" });
//     }

//     let cart = await Cart.findOne({ user: userId });
//     if (!cart) {
//         // Verify if the add quantity is less than the stock
//         if (quantity > product.countInStock) {
//             return res.status(400).json({ message: `Only ${product.countInStock} products available.` });
//         }
//         cart = await Cart.create({
//             user: userId,
//             items: [{ product: productId, quantity }],
//         });
//     } else {
//         const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

//         if (itemIndex > -1) {
//             // 2. Check the stock for update (total quantity)
//             const newTotalQuantity = quantity; // Want to add final quantity

//             if (newTotalQuantity > product.countInStock) {
//                 return res.status(400).json({ message: `Maximum stock: ${product.countInStock}` });
//             }
//             cart.items[itemIndex].quantity = newTotalQuantity;
//         } else {
//             // 3. Verify the stock for a new product add in cart
//             if (quantity > product.countInStock) {
//                 return res.status(400).json({ message: `Insufficient stock!` });
//             }
//             cart.items.push({ product: productId, quantity });
//         }
//         await cart.save();
//     }

//     await cart.populate("items.product");
//     res.status(200).json(cart);
// });



// // Remove product from cart
// export const deleteFromCart = asyncHandler(async (req, res) => {
//     const userId = req.user._id;
//     const productId = req.params.productId;

//     if (!productId) {
//         return res.status(400).json({ message: "productId is required" });
//     }

//     const cart = await Cart.findOne({ user: userId });

//     if (!cart) {
//         return res.status(200).json({ items: [] });
//     }

//     cart.items = cart.items.filter(
//         (item) => item.product.toString() !== productId
//     );

//     const updatedCart = await cart.save();
//     await updatedCart.populate("items.product");
//     res.status(200).json(updatedCart);
// });
// // Get cart

// export const getCart = asyncHandler(async (req, res) => {
//     const userId = req.user._id;

//     const cart = await Cart.findOne({ user: userId }).populate("items.product");

//     if (!cart) {
//         return res.status(200).json({ items: [] });
//     }

//     res.json(cart);
// });







































// // Add to cart or update quantity
// export const addToCart = asyncHandler(async (req, res) => {
//     const { productId, quantity } = req.body;
//     const userId = req.user._id;

//     if (!productId) {
//         return res.status(400).json({ message: "productId is required" });
//     }

//     const qty = Number(quantity || 1);

//     let cart = await Cart.findOne({ user: userId });

//     if (!cart) {
//         cart = await Cart.create({
//             user: userId,
//             items: [{ product: productId, quantity: qty }],
//         });

//         return res.status(201).json(cart);
//     }

//     const itemIndex = cart.items.findIndex(
//         (item) => item.product.toString() === productId
//     );

//     if (itemIndex > -1) {
//         cart.items[itemIndex].quantity += qty;

//         if (cart.items[itemIndex].quantity <= 0) {
//             cart.items.splice(itemIndex, 1);
//         }
//     } else {
//         cart.items.push({ product: productId, quantity: qty });
//     }

//     const updatedCart = await cart.save();
//     await updatedCart.populate("items.product");
//     res.status(200).json(updatedCart);
// });

//



























// Add to cart


// export const addToCart = asyncHandler(async (req, res) => {
//     const { productId, quantity } = req.body;
//     const userId = req.user._id;

//     let cart = await Cart.findOne({ user: userId });

//     if (cart) {
//         const itemIndex = cart.items.findIndex(p => p.product.toString() === productId);

//         if (itemIndex > -1) {
//             cart.items[itemIndex].quantity += Number(quantity);
//         } else {
//             cart.items.push({ product: productId, quantity: Number(quantity) });
//         }

//         const updateCart = await cart.save();
//         res.status(201).json(updateCart);
//     } else {
//         const newCart = await Cart.create({
//             user: userId,
//             items: [{ product: productId, quantity: Number(quantity) }]
//         });
//         res.status(201).json(newCart);
//     }
// })


















