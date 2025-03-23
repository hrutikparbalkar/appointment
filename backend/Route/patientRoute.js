import express from "express";
import { signUp,login,getUserData,handleEdit} from '../controller/patientController.js'

const router = express.Router();
router.post('/signup',signUp)
router.post('/login',login)
router.get("/userProfile/:id",getUserData)
router.put("/updateUserInfo/:id",handleEdit)
export default router;