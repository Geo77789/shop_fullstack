import express from "express"
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import { authUser, registerUser, updateUserProfile } from "../controllers/userController.js";
import { getUserProfile } from "../controllers/userController.js";

router.post("/login", authUser);
router.post("/register", registerUser);

router.put("/profile", protect, updateUserProfile);
router.get("/profile", protect, getUserProfile);

export default router;

