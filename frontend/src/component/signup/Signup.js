import React, { useState } from "react";
import { toast} from 'react-hot-toast';
import { useNavigate,Link } from "react-router-dom";
const Signup = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
   try {
    e.preventDefault();
    const response = await fetch(`${BACKEND_URL}/signup`,{
        method:'POST',
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(formData)
    })
    const data = await response.json();
    if(response.ok){
        toast.success('Successfully created!');
        localStorage.setItem("user",JSON.stringify(data));
        setTimeout(()=>{
          navigate("/login")
      },3000)
    }
    else{
      toast.error('user already exist');

    }
    console.log(data);
    
    
   } catch (error) {
    toast.error('Something is wrong!');
    
   }

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account? */}
        <p className="text-center mt-4 text-gray-600">
          Already have an account? <a href="/login" className="text-blue-500 font-semibold"><Link to={'/login'}><span>Login</span></Link></a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
