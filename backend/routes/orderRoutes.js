import express from "express";
import { createOrder, getOrderById, getMyOrders, getOrders, updateOrderToDelivered } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/deliver").put(protect, updateOrderToDelivered);

export default router;
