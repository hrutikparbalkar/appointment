import express from 'express'
import {createAppointment,getAllAppointment,cancelAppointment,getDoctorAppointments,confirmAppointment} from '../controller/AppointmentC.js';
const router = express.Router();

router.post("/appointment",createAppointment);
router.get("/:userId",getAllAppointment);
router.delete("/:id",cancelAppointment);
router.get("/docAppointment/:doctorId",getDoctorAppointments);
router.put("/confirm/:id",confirmAppointment);
export default router;
