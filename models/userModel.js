const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Enter your username"]
    },
    email: {
        type: String,
        required: [true, "Enter your email address"]
    },
    password: {
        type: String,
        required: [true, "Enter your password"],
        unique: [true]
    }

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);