import React, { useEffect, useState } from 'react'
import { useAuth } from '../AuthContext/AuthContext';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'

const UserAppointment = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const [authUser,setAuthUser]=useAuth();
    const id=authUser._id;
    const sanitizedUserId = id.replace(":", "");
    const [myAppointments,setMyAppointments]= useState([]);
    useEffect(()=>{
        const fetchAppointments =async()=>{
            try {
                const response = await fetch(`${BACKEND_URL}/:${sanitizedUserId}`);
                const data = await response.json();
                // console.log(data);
                if (response.ok) {
                    setMyAppointments(data);
                    // toast.success("Appointments found")
                  } else {
                    toast.error(data.msg)
                  }
                
            } catch (error) {
                console.log("error",error);
                toast.error(error);
                
                
            }
           
            

        }
        fetchAppointments();
    },[])

    const handleCancel=async(id)=>{
      try {
        const conformation=await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, cancel it!"
        });
        if(conformation.isConfirmed){
            const response = await fetch(`${BACKEND_URL}/${id}`,{
              method:"DELETE"
            });
            if(response.ok){
              Swal.fire({
                title: "Cancelled !",
                text: "Your appointment has been cancelled",
                icon: "success"
              });
              toast.success("Appointment cancelled successfully");
              setMyAppointments((prevAppointments)=>
              prevAppointments.filter((appointment)=>appointment._id!=id)
            );
            }
            else{
              toast.error("Failed to cancel appointment")
          }
        }
        
        
      } catch (error) {
        console.log("cancel error",error);
        toast.error("server error")
        
        
      }
      


    }
    
    
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
  <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">My Appointments</h2>

  {myAppointments.length ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {myAppointments.map((appointment) => (
        <div 
          key={appointment._id}
          className="bg-white shadow-lg rounded-lg p-6 transition transform hover:scale-105 hover:shadow-2xl"
        >
          {/* Doctor Info */}
          <div className="flex items-center mb-4">
            <img 
              src={appointment.doctorId.img} 
              alt={appointment.doctorId.name} 
              className="w-16 h-16 rounded-full border-2 border-blue-500"
            />
            <div className="ml-4">
              <h3 className="text-xl font-semibold">{appointment.doctorId.name}</h3>
              <p className="text-gray-500">{appointment.doctorId.speciality}</p>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="border-t border-gray-300 pt-4">
            <p className="text-gray-700"><strong>Date:</strong> {new Date(appointment.date).toDateString()}</p>
            <p className="text-gray-700"><strong>Time:</strong> {appointment.time}</p>
            <p className="text-gray-700"><strong>Fee:</strong> ₹{appointment.doctorId.fee}</p>
            <p className={`font-medium mt-2 ${
              appointment.status === 'confirmed' ? 'text-green-500' :
              appointment.status === 'cancelled' ? 'text-red-500' :
              'text-yellow-500'
            }`}>
              <strong>Status:</strong> {appointment.status}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex justify-between">
            {appointment.status!=="confirmed" &&(<button onClick={()=>handleCancel(appointment._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
              Cancel
            </button>)}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500 text-lg">No appointments found</p>
  )}
</div>

  )
}

export default UserAppointment