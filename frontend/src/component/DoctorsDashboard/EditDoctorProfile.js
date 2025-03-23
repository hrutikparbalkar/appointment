import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditDoctorProfile = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/doctorDetails/${id}`
        );
        const data = await response.json();
        setFormData(data.doctor);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };
    fetchedData();
  }, [id]);
  // console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedFields = {};
  
      
      if (typeof formData.name === "string" && formData.name.trim()) {
        updatedFields.name = formData.name.trim();
      }
      if (typeof formData.email === "string" && formData.email.trim()) {
        updatedFields.email = formData.email.trim();
      }
      if (typeof formData.password === "string" && formData.password.trim()) {
        updatedFields.password = formData.password.trim();
      }
  
      
      if (formData.contact) {
        updatedFields.contact = formData.contact.toString().trim();
      }
      if (formData.fee) {
        updatedFields.fee = formData.fee.toString().trim();
      }
      if (formData.experience) {
        updatedFields.experience = formData.experience.toString().trim();
      }
  
      if (typeof formData.speciality === "string" && formData.speciality.trim()) {
        updatedFields.speciality = formData.speciality.trim();
      }
      if (typeof formData.about === "string" && formData.about.trim()) {
        updatedFields.about = formData.about.trim();
      }
      if (typeof formData.img === "string" && formData.img.trim()) {
        updatedFields.img = formData.img.trim();
      }
  
      const response = await fetch(`${BACKEND_URL}/updateDoctor/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Profile updated successfully!");
        navigate("/Doctor_profile");
      } else {
        toast.error(data.msg || "Failed to update profile");
      }
  
    } catch (error) {
      toast.error(error.message || "Server error occurred");
    }
  };
  
  
  

  return (
    <div>
      <div className="container mx-auto my-10 p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Doctor Profile</h1>

      <form onSubmit={handleEdit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-1">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder={formData.name}
              className="w-full p-3 border rounded-md focus:outline-blue-500"
              
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">Speciality</label>
            <input
              type="text"
              name="speciality"
              
              onChange={handleChange}
              placeholder={formData.speciality}
              className="w-full p-3 border rounded-md focus:outline-blue-500"
             
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">Experience (in years)</label>
            <input
              type="number"
              name="experience"
              
              onChange={handleChange}
              placeholder={formData.experience}
              className="w-full p-3 border rounded-md focus:outline-blue-500"
              
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-1">Change Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="*******"
              className="w-full p-3 border rounded-md focus:outline-blue-500"
              
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-1">Fee</label>
            <input
              type="number"
              name="fee"
              onChange={handleChange}
              placeholder={formData.fee}
              className="w-full p-3 border rounded-md focus:outline-blue-500"
              
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder={formData.email}
              className="w-full p-3 border rounded-md focus:outline-blue-500"
              
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">Phone</label>
            <input
              type="number"
              name=""contact
              onChange={handleChange}
              placeholder={formData.contact}
              className="w-full p-3 border rounded-md focus:outline-blue-500"
              
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-1">Img URL</label>
            <input
              type="text"
              name="img"
              onChange={handleChange}
              placeholder="Img URL"
              className="w-full p-3 border rounded-md focus:outline-blue-500"
              
            />
          </div>
        </div>

        {/* Full-width About Section */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-bold mb-1">About</label>
          <textarea
            name="about"
            onChange={handleChange}
            placeholder="About"
            className="w-full p-3 border rounded-md focus:outline-blue-500"
            rows="4"
            
          />
        </div>

        {/* Buttons */}
        <div className="col-span-1 md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-8 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default EditDoctorProfile;
