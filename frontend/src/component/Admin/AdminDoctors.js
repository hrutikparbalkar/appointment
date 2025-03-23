import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const AdminDoctors = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/admin/doctorsList`);
        const data = await response.json();
        setDoctorsData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch doctors data:", error);
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handledeDelete = async(doctorId)=>{
    try {
      const conformation = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
        });
      if(conformation.isConfirmed){
        const response = await fetch(`http://localhost:8009/admin/delete/${doctorId}`,{
          method:'DELETE'
        })
        if(response.ok){
          Swal.fire({
            title: "Deleted!",
            text: "Doctor data has been deleted.",
            icon: "success"
            });
          toast.success("Deleted successfully")
          setDoctorsData((prevDoctorData)=>
            prevDoctorData.filter((doctor)=>doctor._id !== doctorId)
          )
          navigate("/admin/getAllDoctors")
        }
        else{
          toast.error("Faile to delete")
        }

      } 
    } catch (error) {
        toast.error(error)
      
    }

  }

  return (
    <div className="container mx-auto my-10 p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-500">Doctors List</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="space-y-6">
          {doctorsData.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white  shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center justify-between hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Doctor Image */}
              <div className="flex items-center space-x-6">
                <img
                  src={doctor.img || "https://via.placeholder.com/100"}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                />

                {/* Doctor Info */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{doctor.name}</h2>
                  <p className="text-gray-600">
                    <strong>Email:</strong> {doctor.email}
                  </p>
                  <p className="text-gray-600">
                    <strong>Speciality:</strong> {doctor.speciality}
                  </p>
                  <p className="text-gray-600">
                    <strong>Experience:</strong> {doctor.experience} years
                  </p>
                  <p className="text-gray-600">
                    <strong>Fee:</strong> ₹{doctor.fee}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 mt-4 md:mt-0">
                <button onClick={()=>handledeDelete(doctor._id)}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDoctors;
