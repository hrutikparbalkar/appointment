import logo from "./logo.svg";
import "./App.css";
import { AuthProvider, useAuth } from "./component/AuthContext/AuthContext";
import { Toaster } from "react-hot-toast";
import Navbar from "./component/navbar/Navbar";
import Home from "./component/home/Home";
import Footer from "./component/footer/Footer";
import { Route, Routes } from "react-router-dom";
import AllDoctors from "./component/Alldoctors/AllDoctors";
import AddDoctor from "./component/AddDoctor/AddDoctor";
import Signup from "./component/signup/Signup";
import DoctorDetail from "./component/DoctorDetail/DoctorDetail";
import Login from "./component/login/Login";
import UserAppointment from "./component/UserAppointment/UserAppointment";
import DoctorLogin from "./component/DoctorsDashboard/DoctorLogin";
import DoctorCheckAppointment from "./component/DoctorsDashboard/DoctorCheckAppointment";
import AdminLogin from "./component/Admin/AdminLogin";
import DoctorProfile from "./component/DoctorsDashboard/DoctorProfile";
import EditDoctorProfile from "./component/DoctorsDashboard/EditDoctorProfile";
import AdminDoctors from "./component/Admin/AdminDoctors";
import UserProfile from "./component/userDashboard/UserProfile";





function App() {
   
    const [authUser,setAuthUser,doctorInfo,adminUser]=useAuth();
    // console.log(authUser);
    // console.log(doctorInfo);
    
    
  return (
    <div className="App md:mx-16">
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alldoctors" element={<AllDoctors />} />
          <Route path="/addDoctor" element={<AddDoctor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/AllAppointments" element={<UserAppointment/>}/>
          <Route path="/checkAppointments" element={<DoctorCheckAppointment/>}/>
          <Route path="/doctor/:id" element={<DoctorDetail />} />
          <Route path="/Doctor_profile" element={<DoctorProfile/>}/>
          <Route path="/editDoctorProfile/:id" element={<EditDoctorProfile/>}/>
          <Route path="/doctorLogin" element={<DoctorLogin />} />
          <Route path="/admin" element={<AdminLogin/>}/>
          <Route path="/admin/getAllDoctors" element={<AdminDoctors/>}/>
          <Route path="/userProfile" element={<UserProfile/>}/>

          
        </Routes>
        <Toaster />

        <Footer />
    </div>
  );
}

export default App;
