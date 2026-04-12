  const express = require("express");
  const Razorpay = require("razorpay");
  const crypto = require("crypto"); 
  const Payment = require("../models/payment.js");
  const Booking = require("../models/bookingschema.js");
  const Signup = require("../models/signupschema.js");
  require("dotenv").config();

  const router = express.Router();

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  // 📌 **Create Order API**
  router.post("/order", async (req, res) => {
    try {
      const { amount, currency, userId, bookingId, checkIn, checkOut,room_no} = req.body;

      if (!amount || amount <= 0) {
        return res.json({ success: false, message: "Invalid amount" });
      }
      if (!bookingId) {
        return res.json({ success: false, message: "Booking details are required" });
      }
      if (!userId) {
        return res.json({ success: false, message: "User details are required" });
      }
      if (!checkIn || !checkOut) {
        return res.json({ success: false, message: "Check-in and Check-out dates are required" });
      }
      if (!room_no) {
        return res.json({ success: false, message: "Room number is required" });
      }

      console.log("🔹 Creating order for User:", userId, "Booking:", bookingId, "Amount:", amount);

      const options = {
        amount: amount * 100, 
        currency: currency || "INR",
        receipt: `receipt_${Math.random()}`,
      };

      const order = await razorpay.orders.create(options);
      console.log("✅ Order Created Successfully:", order);

      res.json({ success: true, order });
    } catch (error) {
      console.error("❌ Error creating order:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  });

  router.post("/verify", async (req, res) => {
    try {
      console.log("🔹 Payment Verification Data:", req.body);

      const { 
        razorpay_order_id, 
        razorpay_payment_id, 
        razorpay_signature, 
        userId, 
        bookingId, 
        amount, 
        currency, 
        checkIn, 
        checkOut, 
        room_no,  // Get room number
        arrivalTime // Get arrival time
      } = req.body;

      const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

      if (generatedSignature !== razorpay_signature) {
        return res.status(400).json({ success: false, message: "Payment verification failed. Signature mismatch!" });
      }

      const user = await Signup.findById(userId);
      if (!user) {
        return res.status(400).json({ success: false, message: "User not found" });
      }

      const booking = await Booking.findById(bookingId);

      if (!booking) {
        console.log("❌ Booking not found with ID:", bookingId);
        return res.status(400).json({ success: false, message: "Booking not found" });
      }

      console.log("✅ Booking fetched:", booking);

      try {
        booking.state = false;
        await booking.save();
        console.log("✅ Booking state successfully updated to false");
      } catch (err) {
        console.error("❌ Error saving updated booking:", err);
      }

           
      // Save Payment with new fields
      const payment = new Payment({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        user: user._id,
        booking: booking._id,
        checkIn: new Date(checkIn),  
        checkOut: new Date(checkOut),
        amount: amount,
        currency: currency,
        room_no: room_no, // Store Room Number
        arrivalTime: arrivalTime // Store Arrival Time
      });

      await payment.save();
      console.log("✅ Payment Verified & Stored in DB");

      booking.state = false; 
      await booking.save();

      res.json({ success: true, message: "Payment verified successfully", payment });
    } catch (error) {
      console.error("❌ Payment Verification Error:", error);
      res.status(500).json({ success: false, message: "Payment verification failed" });
    }
  });

  router.get("/test-update-booking/:id", async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.send("Booking not found");
    booking.state = false;
    await booking.save();
    res.send("Booking updated to false");
  });
  
  module.exports = router;
