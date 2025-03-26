import React, { useState } from 'react'
import { toast} from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  
  
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      const response = await fetch(`${BACKEND_URL}/login`,{
          method:'POST',
          headers:{
              "Content-type":"application/json"
          },
          body:JSON.stringify(formData)
      })
      const data = await response.json();
      if(response.ok){
          toast.success('Successfully login!');
          localStorage.setItem("user",JSON.stringify(data.patientUser));
          setTimeout(()=>{
            navigate("/")
            window.location.reload()
          },1000)
      }
      else{
        toast.error('password or email wrong');
  
      }
      console.log(data);
      
      
     } catch (error) {
      toast.error('Something is wrong!');
      
     }
  
    };
   

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="password"
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
            Login
          </button>
        </form>

        {/* Already have an account? */}
        <p className="text-center mt-4 text-gray-600">
          Don't have an account? <a href="" className="text-blue-500 font-semibold"><Link to={'/signup'}><span>Signup</span></Link></a>
        </p>
      </div>
    </div>
  )
 
}

export default Login