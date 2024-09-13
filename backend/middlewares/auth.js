import {catchAsyncErrors } from "./catchAsyncErrors.js";
import {User} from "../models/userSchema.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

//Authentication for admin
export const isAdminAuthenticated = catchAsyncErrors(async(req,res,next) => {
    const token = req.cookies.adminToken;
    if(!token) {
        return next(new ErrorHandler("Admin not authenticated!",400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    //Authorization
    if(req.user.role !== "Admin"){
        return next(
            new ErrorHandler(`${req.user.role} not authorized for this resources!`,403)
        );
    }
    next();
});


//Authentication for Patient
export const isPatientAuthenticated = catchAsyncErrors(async(req,res,next) => {
    const token = req.cookies.patientToken;
    if(!token) {
        return next(new ErrorHandler("Patient not authenticated!",400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    //Authorization
    if(req.user.role !== "Patient"){
        return next(
            new ErrorHandler(`${req.user.role} not authorized for this resources!`,403)
        );
    }
    next();
});