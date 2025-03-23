// import express from 'express';
// import DoctorModel from '../model/DoctorSchema.js';
// import {handleDoctorProfile} from '../controller/DoctorDataC.js'
// const router = express.Router();
// router.get("/allDoctor",async(req,res)=>{
//     try {
//         const doctors = await DoctorModel.find();
//         return res.status(201).json(doctors)
        
//     } catch (error) {
//         return res.status(501).json({msg:"failed to fetched"})
        
//     }
// })

// router.get("/doctor/:id",handleDoctorProfile);
// export default router;