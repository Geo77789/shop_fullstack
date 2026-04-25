import express from "express";
import { addToCart, getCart, deleteFromCart } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

// Add to cart route
router.route("/")
    .post(protect, addToCart)
    .get(protect, getCart)

// Delete the product from cart route   
router.route("/:productId")
    .delete(protect, deleteFromCart);

export default router;