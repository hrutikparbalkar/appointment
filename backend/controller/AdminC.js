import DoctorModel from '../model/DoctorSchema.js';
import patientModel from "../model/PatientMShcema.js";

export const getDoctorsList = async(req,res)=>{
    try {
        const doctorsList = await DoctorModel.find();
        if(!doctorsList){
            return res.status(401).json({msg:"failed to fetch"})
        }
        else{
            res.status(201).json(doctorsList)
        }
        
    } catch (error) {
        res.status(500).json({msg:"server error"})
        
    }

}

export const deleteDoctor =async(req,res)=>{
    try {
        const {id}=req.params;
        const del = await DoctorModel.findByIdAndDelete(id);
        if(!del){
            return res.status(401).json({msg:"Id not found"})
        }
        res.status(201).json({msg:"Deleted successfully"})
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({msg:"server error",error})
        
    }
}


export const getExpertDoctor = async(req,res)=>{
    try {
        const response = await DoctorModel.find();
        if(!response){
            return res.status(401).json({msg:"Not able to fetched"})
        }
        res.status(201).json(response)
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({msg:"server error",error})
        
    }

}