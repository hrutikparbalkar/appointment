import AppointmentModel from "../model/AppointmentSchema.js";

export const createAppointment = async(req,res)=>{
    try {
        const {userId,doctorId,date,time}=req.body;
        const checkExistAppointment = await AppointmentModel.findOne({doctorId,date,time});
        if(checkExistAppointment){
            return res.status(400).json({msg:"Time slot already booked"})
    
        }
        const newAppointment = new AppointmentModel({
            userId:userId,
            doctorId:doctorId,
            date:date,
            time:time
        })
        await newAppointment.save();
        res.status(201).json({msg:"Appointment booked successfully",newAppointment})
        
    } catch (error) {
        res.status(500).json({msg:"server error",error})
        
    }

}


//get all the appointment
export const getAllAppointment = async(req,res)=>{
    const {userId} = req.params;
    // console.log(userId);
    const sanitizeUserId = userId.startsWith(":")?userId.slice(1):userId;//because of : mongodb not able to find user
    
    try {
        const appointments = await AppointmentModel.find({userId:sanitizeUserId})
        .populate("doctorId","name speciality img fee").sort({date:-1})
        if(!appointments.length){
            return res.status(404).json({msg:"No appointments founds"})

        }
        res.status(200).json(appointments)
    } catch (error) {
        console.log("error",error);
        res.status(500).json({msg:"server error"})
        
        
    }

}

//doctor appointment check
export const getDoctorAppointments=async(req,res)=>{
    const {doctorId} =req.params;
    const sanitizeDoctorId = doctorId.startsWith(":")?doctorId.slice(1):doctorId;
    try {
        const appointments = await AppointmentModel.find({doctorId:sanitizeDoctorId})
        .populate("userId","name email").sort({date:-1})
        if(!appointments.length){
            return res.status(404).json({msg:"No appointments founds"})
        }
        res.status(201).json(appointments)
    } catch (error) {
        console.log("error",error);
        res.status(500).json({msg:"server error"})
        
    }
}

//cancel appointment
export const cancelAppointment = async(req,res)=>{
    try {
        let {id}=req.params;
        // console.log(id);
        if (id.startsWith(":")) {
            id = id.slice(1);
          }
        
        const appointment = await AppointmentModel.findByIdAndDelete(id);
        if(!appointment){
            return res.status(404).json({msg:"Appointment not found"})
        }
        res.status(201).json({msg:"Appointment successfully cancelled",appointment})
        
    } catch (error) {
        console.log("e",error);
        
        res.status(501).json({msg:"Server error"})
        
    }

}

//conform appointment
export const confirmAppointment=async(req,res)=>{
    try {
        const {id}=req.params;
        const appointment = await AppointmentModel.findByIdAndUpdate(id,{status:"confirmed"},{new:true})
        if (!appointment) {
            return res.status(404).json({ msg: "Appointment not found" });
          }
      
          res.status(200).json({ msg: "Appointment confirmed", appointment });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ msg: "Server error" });
        
    }
}
