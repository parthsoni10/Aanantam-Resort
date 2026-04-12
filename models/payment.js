  const mongoose = require("mongoose");

  const PaymentSchema = new mongoose.Schema({
    orderId: String,
    paymentId: String,
    signature: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "signup",
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booking",
    },  
    checkIn: { type: Date, required: true },  
    checkOut: { type: Date, required: true }, 
    amount: Number,
    currency: String,
    room_no: Number, // New Field for Room Number
    arrivalTime: String, // New Field for Arrival Time
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports= mongoose.model("Payment", PaymentSchema);
  