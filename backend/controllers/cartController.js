import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";



// Add to cart


export const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
        const itemIndex = cart.items.findIndex(p => p.product.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += Number(quantity);
        } else {
            cart.items.push({ product: productId, quantity: Number(quantity) });
        }

        const updateCart = await cart.save();
        res.status(201).json(updateCart);
    } else {
        const newCart = await Cart.create({
            user: userId,
            items: [{ product: productId, quantity: Number(quantity) }]
        });
        res.status(201).json(newCart);
    }
})





// export const addToCart = async (req, res) => {
//     const { productId, quantity } = req.body;
//     const userId = req.user._id;

//     try {
//         let cart = await Cart.findOne({ user: userId });

//         if (cart) {
//             // Find the product
//             const itemIndex = cart.items.findIndex(p => p.product.toString() === productId);

//             // If the product exist
//             if (itemIndex > -1) {

//                 cart.items[itemIndex].quantity += Number(quantity);
//             } else {
//                 cart.items.push({ product: productId, quantity: Number(quantity) });
//             }

//             cart = await cart.save();
//             return res.status(201).json(cart);

//         } else {
//             // If don't exist a cart for the user create one
//             const newCart = await Cart.create({
//                 user: userId,
//                 items: [{ product: productId, quantity: Number(quantity) }]
//             });
//             return res.status(201).json(newCart);
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error adding to cart" });
//     }
// };





export const getCart = async (req, res) => {

    try {
        // Search the cart
        const cart = await Cart.findOne({ user: req.user._id })
            .populate("items.product", "name price image countInStock");

        if (cart) {
            res.status(200).json(cart);
        } else {
            // If don't exist a cart send a empty array to don't break the app
            res.status(200).json({ items: [] });
        }
    } catch (error) {
        res.status(500).json({ message: "Error getting cart" });
    }


};


// Delete the product from cart



export const deleteFromCart = async (req, res) => {

    try {
        const cart = await Cart.findOneAndUpdate(
            { user: req.user._id },
            {
                $pull: { items: { product: req.params.productId } }
            },
            { new: true } // return the updated cart
        ).populate("items.product", "name price image");


        if (!cart) {
            return res.status(404).json({
                message: "The cart don't exist"
            });

        }

        res.json(cart);

    } catch (error) {
        res.status(500).json({ message: "Error deleting from cart" });
    }


}









