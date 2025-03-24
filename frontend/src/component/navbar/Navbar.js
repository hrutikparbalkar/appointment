import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import { toast } from 'react-hot-toast';
import 'animate.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [authUser, setAuthUser, doctorInfo, setDoctorInfo, adminUser, setAdminUser] = useAuth();
  const [isOpen, setIsOpen] = useState(false);  // Mobile menu toggle

  const closeMenu = () => setIsOpen(false); 

  const logout = () => {
    setAuthUser({ ...authUser, user: null });
    setDoctorInfo({ ...doctorInfo, doctor: null });
    setAdminUser({ ...adminUser, admin: null });

    localStorage.removeItem("user");
    localStorage.removeItem("doctor");
    localStorage.removeItem("admin");
    toast.success("Logged out successfully");

    setTimeout(() => {
      navigate('/login');
      window.location.reload();
    }, 1500);
  };

  return (
    <nav className="bg-blue-300 lg:p-5 md:p-3 p-2 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to={'/'} onClick={closeMenu}>
          <h1 className="text-2xl font-extrabold cursor-pointer animate__animated animate__backInLeft animate__delay-0.5s">QuickCare</h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center lg:gap-8 md:gap-4 text-lg font-semibold animate__animated animate__bounceInRight animate__delay-0.5s">
          <Link to={'/'} onClick={closeMenu}><li className="hover:text-gray-200 transition">Home</li></Link>
          {authUser && <Link to={'/alldoctors'} onClick={closeMenu}><li className="hover:text-gray-200 transition">All Doctors</li></Link>}
          {authUser && <Link to={'/AllAppointments'} onClick={closeMenu}><li className="hover:text-gray-200 transition">My Appointments</li></Link>}
          {doctorInfo && !authUser && <Link to={'/checkAppointments'} onClick={closeMenu}><li className="hover:text-gray-200 transition">Check Appointments</li></Link>}
          {adminUser && <Link to={'/addDoctor'} onClick={closeMenu}><li className="hover:text-gray-200 transition">Add Doctor</li></Link>}
          {adminUser && <Link to={'/admin/getAllDoctors'} onClick={closeMenu}><li className="hover:text-gray-200 transition">All Doctors</li></Link>}
          
          {!doctorInfo && !authUser && !adminUser && (
            <>
              <Link to={'/doctorLogin'} onClick={closeMenu}><li className="hover:text-gray-200 transition">Doctor Login</li></Link>
              <Link to={'/admin'} onClick={closeMenu}><li className="hover:text-gray-200 transition">Admin Login</li></Link>
            </>
          )}

          {(doctorInfo || authUser) && (
            <Link to={doctorInfo ? '/Doctor_profile' : '/userProfile'} onClick={closeMenu}>
              <li className="pl-3 hover:text-gray-200 transition">Profile</li>
            </Link>
          )}
          
          {(authUser || doctorInfo || adminUser) ? (
            <li 
              onClick={() => { closeMenu(); logout(); }}
              className="cursor-pointer hover:text-red-500 transition"
            >
              Logout
            </li>
          ) : (
            <Link to={'/login'} onClick={closeMenu}><li className="hover:text-gray-200 transition">Login</li></Link>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center gap-4 p-4 bg-blue-300 text-white font-bold mt-2 transition-all">
          <Link to={'/'} onClick={closeMenu}><li>Home</li></Link>
          {authUser && <Link to={'/alldoctors'} onClick={closeMenu}><li>All Doctors</li></Link>}
          {authUser && <Link to={'/AllAppointments'} onClick={closeMenu}><li>My Appointments</li></Link>}
          {doctorInfo && <Link to={'/checkAppointments'} onClick={closeMenu}><li>Check Appointments</li></Link>}
          {adminUser && <Link to={'/addDoctor'} onClick={closeMenu}><li>Add Doctor</li></Link>}
          {adminUser && <Link to={'/admin/getAllDoctors'} onClick={closeMenu}><li>All Doctors</li></Link>}
          {!doctorInfo && !authUser && !adminUser && <Link to={'/doctorLogin'} onClick={closeMenu}><li>Doctor Login</li></Link>}
          {!doctorInfo && !authUser && !adminUser && <Link to={'/admin'} onClick={closeMenu}><li>Admin Login</li></Link>}
          
          <li onClick={closeMenu}>About Us</li>

          <li>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                  />
                </div>
              </div>

              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow bg-blue-500">
                {(doctorInfo || authUser) && (
                  <Link to={doctorInfo ? '/Doctor_profile' : '/userProfile'} onClick={closeMenu}>
                    <li className="pl-3">Profile</li>
                  </Link>
                )}
                {authUser || doctorInfo || adminUser ? (
                  <li onClick={logout} className="pl-3 cursor-pointer hover:text-red-500">Logout</li>
                ) : (
                  <Link to={'/login'} onClick={closeMenu}><li className="pl-3">Login</li></Link>
                )}
              </ul>
            </div>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
