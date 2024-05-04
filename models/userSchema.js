import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment"; // Import moment.js for date manipulation

// User Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain At least 3 Characters!"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At least 3 Characters!"]
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: value => validator.isEmail(value),
            message: "Dude not a valid Email, try again!"
        },
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone number must contain Exact 10 Digit!"],
        maxLength: [10, "Phone number must contain Exact 10 Digit!"]
    },
    nic: {
        type: String,
        required: true,
        minLength: [13, "NIC Must Contain Exact 13 Digit!"],
        maxLength: [13, "NIC Must Contain Exact 13 Digit!"]
    },
    dob: {
        type: Date,
        required: [true, "DOB is required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"],
    },
    password: {
        type: String,
        minLength: [8, "password must contain At Least 8 Charecters"],
        required: true,
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "User", "Doctor"],
    },
    doctorDepartment: {
        type: String,
        url: String,
    },
    docAvatar: {
        public_id: String,
        url: String,
    },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate JWT
userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};





export const User = mongoose.model("User", userSchema);
