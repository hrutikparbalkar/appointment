import express from 'express'
import {DoctorDataHandler,handleDoctorLogin,getAllDoctor,handleDoctorDetail,handleDoctorProfile,handleEditProfile} from '../controller/DoctorDataC.js'
const router = express.Router();
router.post("/addDoctor",DoctorDataHandler);
router.post("/dlogin",handleDoctorLogin)
router.get("/allDoctor",getAllDoctor)
router.get("/doctor/:id",handleDoctorDetail)
router.get("/doctorDetails/:id",handleDoctorProfile)
router.put("/updateDoctor/:id",handleEditProfile)
export default router;
