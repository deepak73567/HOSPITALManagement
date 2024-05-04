import { catchAsyncError } from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../middlewares/errorMiddleware.js"; // Fix the class name

export const isAdminAuthenticated = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return next(new ErrorHandler("Admin Not Authenticated", 400)); // Fix the error status code
    }
   
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        if (req.user.role !== "Admin") { // Fix the role comparison
            return next(new ErrorHandler(`${req.user.role} Not Authenticated for this resources`, 403)); // Fix the error status code
        }
        next();
    
});

export const isPatientAuthenticated = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
        return next(new ErrorHandler("Patient Not Authenticated", 400)); // Fix the error status code
    }
   
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        if (req.user.role !== "Patient") { // Fix the role comparison
            return next(new ErrorHandler(`${req.user.role} Not Authenticated for this resource`, 403)); // Fix the error message and status code
        }
        next();
    
});
