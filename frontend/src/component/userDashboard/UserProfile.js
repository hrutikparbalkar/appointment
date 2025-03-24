import React, { useEffect, useState } from 'react'
import { useAuth } from '../AuthContext/AuthContext';
import { toast} from 'react-hot-toast';
import { ClipLoader } from "react-spinners";
const UserProfile = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  
  const [authUser]=useAuth();
  const [userData,setUserData] = useState(null);
  const [isEditing,setIsEditing]=useState(false);
  const [formData,setFormData]= useState({
    name:"",
    email:"",
    password:""
  })
  // console.log(authUser._id);
  
  useEffect(()=>{
    const getData = async()=>{
      try {
        
        const response = await fetch(`${BACKEND_URL}/userProfile/${authUser._id}`);
        const data  = await response.json();
        setUserData(data)
        
      } catch (error) {
        console.log(error);
      }

    }
    getData();
  },[authUser])
  if (!userData) {
    return <div className="flex justify-center items-center min-h-screen">
              <ClipLoader color="#36D7B7" />
            </div>
  }
  // console.log(userData);
  const handleEdit=()=>{
    setIsEditing(true)
  }
  const handleCancel=()=>{
    setIsEditing(false)
    setFormData({
      name:formData.name,
      email:formData.email
    })
  }
  const handleSave = async () => {
    try {
      const updatedFields = {};
  
      // Send only non-empty fields
      if (formData.name.trim()) {
        updatedFields.name = formData.name;
      }
      if (formData.email.trim()) {
        updatedFields.email = formData.email;
      }
      if (formData.password.trim()) {
        updatedFields.password = formData.password;
      }
  
      const response = await fetch(`${BACKEND_URL}/updateUserInfo/${authUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedFields)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setUserData(data);
        setIsEditing(false);
        toast.success("Updated successfully");
      } else {
        toast.error("Failed to update");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Server error");
    }
  };
  


  
  return (
    <div className="md:flex md:items-center md:justify-center bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center">
        {/* User Info */}
        <div className="w-3/3 px-8">
          <h1 className="md:text-4xl text-2xl font-bold text-center text-blue-500 mb-6">User Profile</h1>
          
          <div className="space-y-4">
            <div className="flex items-center gap-8 md:gap-5">
              <label className="font-semibold text-gray-600 w-1/4">Name:</label>
              {isEditing?
               <input
               type="text"
               name="name"
               value={formData.name}
               placeholder={userData.name}
               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
               className="w-full p-2 border rounded-md"
              />
              :<p className="text-lg text-gray-800 pl-0 md:pl-0">{userData.name}</p>
              }
            </div>

            <div className="flex items-center gap-8 md:gap-5">
              <label className="font-semibold text-gray-600 w-1/4">Email:</label>
              {
                isEditing?
                <input
               type="text"
               name="email"
               placeholder={userData.email}
               value={formData.email}
               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
               className="w-full p-2 border rounded-md"
              />
              :
              <p className="text-lg text-gray-800 pl-0  md:pl-0">{userData.email}</p>
              }
              
            </div>
            <div className="flex items-center gap-8 md:gap-5">
              {isEditing &&(<label className="font-semibold text-gray-600 w-1/4">Change Password:</label>)}
              {
                isEditing &&
                <input
               type="password"
               name="password"
               placeholder="password"
               value={formData.password}
               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
               className="w-full p-2 border rounded-md"
              />
              
              
              }
              
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
                  Save
                </button>
                <button onClick={handleCancel} className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300">
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={handleEdit} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile