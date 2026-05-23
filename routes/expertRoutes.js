import express from "express";
import User from "../models/user.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ✅ GET ALL EXPERTS (PUBLIC)
router.get("/", async (req, res) => {
  try {
    const experts = await User.find({ role: "expert" }).select("-password");

    return res.status(200).json({
      message: "Experts fetched successfully",
      experts: experts || [],
    });
  } catch (error) {
    console.log("EXPERT FETCH ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch experts",
      error: error.message,
    });
  }
});

// ✅ EXPERT DASHBOARD (PROTECTED)
router.get(
  "/dashboard",
  protect,
  authorizeRoles("expert"),
  (req, res) => {
    return res.status(200).json({
      message: "Expert Dashboard Access Granted",
      user: req.user,
    });
  }
);

export default router;