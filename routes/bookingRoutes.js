import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createBooking,
  getMyBookings,
  cancelBooking,
} from "../controllers/bookingController.js";

const router = express.Router();


//  Create booking (logged-in user only)
router.post("/", protect, createBooking);


//  Get logged-in user's bookings (VERY IMPORTANT)
router.get("/my", protect, getMyBookings);


// Cancel booking (optional but good for internship)
router.patch("/:id/cancel", protect, cancelBooking);

export default router;