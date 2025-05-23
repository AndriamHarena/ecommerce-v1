const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    total: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
