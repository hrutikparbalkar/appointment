// import express from 'express'
// import DoctorModel from '../model/DoctorSchema.js';
// const router = express.Router();
// router.get("/doctor/:id",async(req,res)=>{
//     try {
//         // console.log(req.params.id);
//         const doctor = await DoctorModel.findById(req.params.id);
//         return res.status(201).json(doctor)
        
//     } catch (error) {
//         return res.status(500).json({msg:"data is not found"})     
//     }
// })
// export default router;