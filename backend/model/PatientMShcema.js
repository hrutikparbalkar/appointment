import mongoose from "mongoose";

const patientShcema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
},{
    timestamps:true
});

const patientModel = mongoose.model("patient",patientShcema);
export default patientModel;