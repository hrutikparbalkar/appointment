import DoctorModel from '../model/DoctorSchema.js';
import bcrypt from 'bcryptjs';

export const DoctorDataHandler = async(req,res)=>{
    try {
        const {name,speciality,experience,contact,img,fee,about,email,password} = req.body;
        // console.log(req.body);
        const checkEmail = await DoctorModel.findOne({email});
        if (checkEmail){
            return res.status(400).json({error:"user already exists"})
        }
        const DoctorHashPass=await bcrypt.hash(password,10);
        const newDoctor = new DoctorModel(
            {
                name:name,
                speciality:speciality,
                experience:experience,
                contact:contact,
                img:img,
                fee:fee,
                about:about,
                password:DoctorHashPass,
                email:email
            }
        )
        await newDoctor.save();
        res.status(201).json({msg:"new doctor data created successfully"})
        
    } catch (error) {
        console.log("error",error);
        res.status(501).json({msg:"internal server error"})
        
    }
}


export const handleDoctorLogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const doctorUser = await DoctorModel.findOne({email});
        const isMatch = await bcrypt.compare(password,doctorUser.password);
        if(!isMatch || !doctorUser){
            return res.status(400).json({msg:"Inavlid email or password"})
        }
        else{
            res.status(201).json({msg:"Successfully login",doctorUser:{
                _id:doctorUser._id,
                name:doctorUser.name,
                email:doctorUser.email
            }})
        }
    } catch (error) {
        console.log("error",error);
        return res.status(400).json({msg:`error ${error}`})
        
    }

}

export const getAllDoctor=async(req,res)=>{
    try {
        const doctors = await DoctorModel.find();
        return res.status(201).json(doctors)
        
    } catch (error) {
        return res.status(501).json({msg:"failed to fetched"})
        
    }
}

export const handleDoctorDetail =async(req,res)=>{
    try {
        // console.log(req.params.id);
        const doctor = await DoctorModel.findById(req.params.id);
        return res.status(201).json(doctor)
        
    } catch (error) {
        return res.status(500).json({msg:"data is not found"})     
    }
}

export const handleDoctorProfile = async(req,res)=>{
    try {
        const {id} = req.params;
        // console.log(id);
        const doctor = await DoctorModel.findOne({_id:id});
        if(!doctor){
            return res.status(401).json({msg:"Doctor id not found"})
        }
        res.status(201).json({msg:"doctor",doctor});

        
    } catch (error) {
        res.status(400).json({msg:"server error"});
        
    }
}

export const handleEditProfile = async(req,res)=>{
    try {
        const {id}=req.params;
        const {name,speciality,fee,img,contact,about,email,password,experience}=req.body;
        const updatedData={}
        if(name) updatedData.name=name;
        if(speciality) updatedData.speciality=speciality;
        if(fee) updatedData.fee=fee;
        if(experience) updatedData.experience=experience;
        if(email) updatedData.email=email;
        if(img) updatedData.img=img;
        if(contact) updatedData.contact=contact;
        if(about) updatedData.about=about;

        if(password){
            const hash = await bcrypt.hash(password,10);
            updatedData.password=hash;

        }

        const updateDoctorInfo = await DoctorModel.findByIdAndUpdate(
            id,
            {$set:updatedData},
            { new: true, runValidators: true }
        );
        res.status(200).json({ doctor: updateDoctorInfo });
        
    } catch (error) {
        res.status(500).json({ message: "Error updating doctor profile" });
        
    }
}


