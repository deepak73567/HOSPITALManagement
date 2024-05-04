import mongoose from "mongoose";

export const dbConnection=async()=>{
 await mongoose.connect(process.env.MONGO_URI,{
    dbName:"HOSPITAL_MANAGEMENT"
 }).then(()=>{
    console.log("Connected Successfully");
 }).catch((err)=>{
    console.log(`some error occured while connecting to database:${err}`);
});   
}