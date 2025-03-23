import patientModel from "../model/PatientMShcema.js";
import bcryptjs from 'bcryptjs'

export const signUp=async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        // console.log("body",req.body);
        
        const user = await patientModel.findOne({email});
        if (user){
            return res.status(400).json({error:"user already exists"})
        }
        const hashPassword = await bcryptjs.hash(password,10);
        const createUserData= new patientModel({
            name:name,
            email:email,
            password:hashPassword
        })
        await createUserData.save();
        res.status(201).json({msg:"user created successfully",user:{
            _id:createUserData._id,
            name:createUserData.name,
            email:createUserData.email
        }})
        // console.log(createUserData);
        
        
    } catch (error) {
        console.log("error",error);
        res.status(501).json({msg:"internal server error"})
        
    }

}


export const login =async(req,res)=>{
    try {
        const {email,password} = req.body;
        const patientUser = await patientModel.findOne({email});
        const isMatch = await bcryptjs.compare(password,patientUser.password)
        if(!patientUser || !isMatch){
            return res.status(400).json({msg:"Invalid username or password"})
        }
        else{
            res.status(201).json({msg:"Login successful",patientUser:{
                _id:patientUser._id,
                name:patientUser.name,
                email:patientUser.email
            }})
        }
    } catch (error) {
        console.log("error",error);
        return res.status(400).json({msg:`error ${error}`})
        

        
    }

}

export const getUserData=async(req,res)=>{
    try {
        const {id}=req.params;
        const response = await patientModel.findOne({_id:id});
        if(!response){
            return res.status(404).json({msg:"something is wrong"})
        }
        res.status(201).json(response)
        
    } catch (error) {
        res.status(501).json({msg:"server error"})
        
    }
}

export const handleEdit = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
  
      // Prepare an object with only non-empty fields
      const updatedData = {};
  
      if (name) updatedData.name = name;
      if (email) updatedData.email = email;
  
      // Hash password if provided
      if (password) {
        const hashPass = await bcryptjs.hash(password, 10);
        updatedData.password = hashPass;
      }
  
      const updatedUser = await patientModel.findByIdAndUpdate(
        id,
        { $set: updatedData },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      res.status(200).json(updatedUser);
  
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ msg: "Server error", error });
    }
  };
  