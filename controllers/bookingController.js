import Booking from "../models/Booking.js";


// CREATE BOOKING

export const createBooking = async (req, res) => {
  try {
    const { expert, date, time } = req.body;

    // validation (important for assignment)
    if (!expert || !date || !time) {
      return res.status(400).json({
        message: "expert, date, and time are required",
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      expert,
      date,
      time,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



//  GET MY BOOKINGS

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("expert", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "My bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



//  CANCEL BOOKING

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // only owner can cancel
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};