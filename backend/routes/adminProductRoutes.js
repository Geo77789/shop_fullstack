import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { createProduct, updateProduct, deleteProduct, getAdminSummary } from "../controllers/adminProductController.js";





const router = express.Router();

router.use(protect);
router.use(admin);

router.route("/")
    .post(createProduct);

router.get("/summary", protect, admin, getAdminSummary); // first fixed routes

router.route("/:id") // after routes with dynamic params
    .put(updateProduct)
    .delete(deleteProduct);

export default router;