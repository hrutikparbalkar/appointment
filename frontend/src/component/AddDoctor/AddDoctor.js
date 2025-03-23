import React, { useState } from "react";
import { toast} from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


const AddDoctor = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  
  const navigate=useNavigate();
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    fee: "",
    speciality: "",
    experience: "",
    about: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${BACKEND_URL}/addDoctor`,{
            method:'POST',
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(doctor)
        })
        const data = await response.json();
        // console.log(data);
        if(response.ok){
            toast.success('Successfully created!');
        }
        setDoctor({
            name: "",
            email: "",
            password: "",
            contact: "",
            fee: "",
            speciality: "",
            experience: "",
            about: "",
            img: "",
        });
        setTimeout(function(){
          navigate("/admin/getAllDoctors")
            
        },1000)
        
        

        
    } catch (error) {
        toast.error('Something is wrong');
        
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-5">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add New Doctor
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="text-gray-700 font-semibold">Doctor's Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter name"
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>

          {/* Contact */}
          <div>
            <label className="text-gray-700 font-semibold">Contact No</label>
            <input
              type="text"
              name="contact"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter contact number"
              onChange={handleChange}
              required
            />
          </div>

          {/* Fee */}
          <div>
            <label className="text-gray-700 font-semibold">Fee</label>
            <input
              type="number"
              name="fee"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Fee"
              onChange={handleChange}
              required
            />
          </div>

          {/* Speciality Dropdown */}
          <div>
            <label className="text-gray-700 font-semibold">Speciality</label>
            <select
              name="speciality"
              className="select select-bordered w-full  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              required
            >
              <option disabled selected>Select Speciality</option>
              <option>Cardiologist</option>
              <option>Neurologist</option>
              <option>Dermatologist</option>
              <option>Pediatrician</option>
              <option>Orthopedic Surgeon</option>
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="text-gray-700 font-semibold">Experience</label>
            <input
              type="text"
              name="experience"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Years of experience"
              onChange={handleChange}
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="text-gray-700 font-semibold">Image URL</label>
            <input
              type="text"
              name="img"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter image URL"
              onChange={handleChange}
              required
            />
          </div>

          {/* About (full width) */}
          <div className="md:col-span-2">
            <label className="text-gray-700 font-semibold">About</label>
            <textarea
              name="about"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-24"
              placeholder="Brief description about the doctor"
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Submit Button (full width) */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-300"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
