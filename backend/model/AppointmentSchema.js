import mongoose from "mongoose";
const appointmentSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"patient",
        required:true

    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"doctorData",
        required:true

    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending",
    },

},{timestamps:true});

const AppointmentModel = mongoose.model("appointment",appointmentSchema);
export default AppointmentModel;