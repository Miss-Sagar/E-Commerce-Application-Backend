const mongoose = require("mongoose");
const userSchema = require("../models/userModel");

const cartDataSchema = mongoose.Schema({
    itemId: {
        type: String,
        required: [true, "Item ID is required"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true],
        ref: userSchema
    },
    category: {
        type: String,
        required: [true, "enter the item category"]
    },
    quantity: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
        required: [true, "enter he price of the product"]
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("cartData", cartDataSchema)