import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import toast from "react-hot-toast";

const DoctorCheckAppointment = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [authUser, setAuthUser, doctorInfo] = useAuth();

  // console.log(doctorInfo);

  const [myAppointments, setMyAppointments] = useState([]);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/docAppointment/:${doctorInfo._id}`
        );
        const data = await response.json();
        // console.log(data);
        if (response.ok) {
          setMyAppointments(data);
          toast.success("Appointments found");
        } else {
          toast.error(data.msg);
        }
      } catch (error) {
        console.log("error", error);
        toast.error(error);
      }
    };
    fetchAppointments();
  }, []);

  const handleConfirm =async(appointmentID)=>{
    try {
      const response = await fetch(`${BACKEND_URL}/confirm/${appointmentID}`,{
        method:"PUT",
        headers:{
          "Content-type":"application/json",

        },
        
      });
      const data = await response.json();
      if(response.ok){
        toast.success("Appointment confirmed")
        setMyAppointments((prevAppointments)=>
          prevAppointments.map((appointment)=>
            appointment._id=appointmentID ? {...appointment,status:"confirmed"} :appointment
          )
        )
      }
      else{
        toast.error(data.msg)
      }
      
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to confirm appointment");
      
    }
    
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
  <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Doctor Appointments</h2>

  {myAppointments.length === 0 ? (
    <p className="text-gray-500 text-center">No appointments found</p>
  ) : (
    <div className="flex flex-wrap gap-6">
      {myAppointments.map((appointment) => (
        <div
          key={appointment._id}
          className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition w-full md:w-[48%] lg:w-[32%] xl:w-[30%]"
        >
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            Patient: {appointment.userId?.name}
          </h3>
          <p className="text-gray-700">
            <strong>Email:</strong> {appointment.userId?.email}
          </p>
          <p className="text-gray-700">
            <strong>Date:</strong>{" "}
            {new Date(appointment.date).toLocaleDateString()}
          </p>
          <p className="text-gray-700">
            <strong>Time:</strong> {appointment.time}
          </p>
          <p
            className={`text-lg font-bold mt-3 ${
              appointment.status === "confirmed"
                ? "text-green-500"
                : appointment.status === "pending"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            Status: {appointment.status}
          </p>
          <div className="mt-3">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300"
              disabled={appointment.status === "confirmed"}
              onClick={()=>handleConfirm(appointment._id)}
            >
              {appointment.status === "confirmed" ? "Confirmed" : "Confirm"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default DoctorCheckAppointment;
