import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import {User} from "../models/userSchema.js";
import {generateToken} from "../utils/jwttoken.js"

//register a patient

export const patientRegister = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
  } = req.body;
if( !firstName||
    !lastName||
    !email||
    !phone||
    !password||
    !gender||
    !dob||
    !nic||
    !role){
        return next(new ErrorHandler("please fill full form!",400));

    }
    let user=await User.findOne({email});
    if(user){
        return next(new ErrorHandler("user Already Registered!",400));
    }
    user=await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
    });
    generateToken(user,"user registered successfully!",400,res)
   
    
});

export const login=catchAsyncError(async(req,res,next)=>{
    const {email,password,confirmPassword,role}=req.body;
    if(!email|| !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please Provide All Details!",400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password And Confirm Password Not Matched",400));
    }
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Password Or Email",400));
    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password Or Email",400));
    }
    if(role!==user.role){
        return next(new ErrorHandler("User with This Role Not Found",400));
    }
    generateToken(user,"user Login successfully!",200,res)

});

export const addNewAdmin =catchAsyncError(async(req,res,next)=>{
    const{
        firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
   
    }=req.body;
    if( !firstName||
        !lastName||
        !email||
        !phone||
        !password||
        !gender||
        !dob||
        !nic
        ){
            return next(new ErrorHandler("please fill full form!",400));
        }
    const isRegistered =await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists!`));
    }
    const admin=await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role:"Admin"
    });
    res.status(200).json({
        success:true,
        message:"New Admin Registered"
    })
    
});