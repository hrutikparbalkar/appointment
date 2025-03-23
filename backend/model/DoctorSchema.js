import mongoose from "mongoose";
const DoctorSchema = mongoose.Schema({
    name:{type:String,required:true},
    speciality:{type:String,required:true},
    experience:{type:String,required:true},
    contact:{type:Number,unique:true},
    img:{type:String},
    fee:{type:Number},
    about:{type:String},
    password:{type:String,required:true},
    email:{type:String,required:true},

})
const DoctorModel = mongoose.model("doctorData",DoctorSchema);
export default DoctorModel;