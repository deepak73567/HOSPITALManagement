import mongoose from "mongoose";
import validator from "validator";

const mongooseSchema = new mongoose.Schema({
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
        }
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone number must contain Exact 10 Digit!"],
        maxLength: [10, "Phone number must contain Exact 10 Digit!"]
    },
    message: {
        type: String,
        required: true,
        minLength: [10, "Message must contain at-least 10 Characters"]
    },
});

export const Message = mongoose.model("Message", mongooseSchema);
