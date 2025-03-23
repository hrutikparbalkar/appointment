import express from "express";
import {getDoctorsList,deleteDoctor,getExpertDoctor} from '../controller/AdminC.js'
const router = express.Router();
router.get("/doctorsList",getDoctorsList);
router.delete("/delete/:id",deleteDoctor);
router.get("/expertDoctor",getExpertDoctor);
export default router;