import dotenv from 'dotenv'
import express from 'express'

import mongoose from 'mongoose';
import cors from 'cors'

//route
import Patientroute from './Route/patientRoute.js';
import DoctorAddRoute from './Route/DoctorAddRoute.js'

import storeAppointment from './Route/AppointmentRoute.js'
import admin from './Route/AdminRoute.js'
const app=express();
dotenv.config();
const FRONTEND_URL = process.env.FRONTEND_URL;
const PORT =process.env.PORT || 9000
const MongodbURL = process.env.MongodbURL;
const allowedOrigins = [
    'http://localhost:3000',  // Local development
    'https://doctor-appointment-web-app-deploy.onrender.com'  // Production
  ];



app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));
  

//connect mongodb
try {
    mongoose.connect(MongodbURL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log("connected to db");
    


    
} catch (error) {
    console.log("error",error);
    
    
}
app.use('/',Patientroute);
app.use('/',DoctorAddRoute);


app.use('/',storeAppointment);

app.use('/admin',admin)


app.listen(PORT,()=>{
    // console.log(`server started ${PORT}`);
    
})