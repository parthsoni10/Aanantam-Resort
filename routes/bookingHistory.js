const express = require("express");
const router = express.Router();
const BookingHistory = require("../models/BookingHistory.js");

// Save booking details in the database
router.post("/api/save-booking", async (req, res) => {
    try {
        const { userId, bookingId, paymentId, orderId, amount, currency, checkIn, checkOut, roomTitle, roomType } = req.body;

        if (!userId || !bookingId || !paymentId || !orderId || !amount || !currency || !checkIn || !checkOut || !roomTitle || !roomType) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Save booking history in the database
        const bookingHistory = new BookingHistory({
            user: userId,
            booking: bookingId,
            paymentId,
            orderId,
            amount,
            currency,
            checkIn,
            checkOut,
            roomTitle,
            roomType,
        });

        await bookingHistory.save();

        console.log("✅ Booking History Saved:", bookingHistory);
        res.json({ success: true, message: "Booking details saved successfully", bookingHistory });
    } catch (error) {
        console.error("❌ Error saving booking details:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// API to save booking details
router.post("/api/save-booking", async (req, res) => {
    try {
        const booking = new BookingHistory(req.body);
        await booking.save();
        console.log("✅ Booking Saved:", booking);
        res.json({ success: true, message: "Booking saved successfully!", booking });
    } catch (error) {
        console.error("❌ Error saving booking:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
