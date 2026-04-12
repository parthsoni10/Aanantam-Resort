const { required } = require("joi");
const mongoose = require("mongoose");

const BookingHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "signup",
        required: true,
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "booking",
        required: true,
    },
    paymentId: String,
    orderId: String,
    amount: Number,
    currency: String,
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    roomTitle: String,
    roomType: String,
    roomNo: { type: String},  // Added Room Number
    arrivalTime: { type: String},  // Added Arrival Time
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("BookingHistory", BookingHistorySchema);
