import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import { toast} from 'react-hot-toast';
import PersonIcon from '@mui/icons-material/Person';


const Navbar = () => {
  const navigate = useNavigate();
  const [authUser,setAuthUser,doctorInfo,setDoctorInfo,adminUser,setAdminUser]=useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false); // Function to close menu
  
 
  
  
  const logout=()=>{
    setAuthUser({...authUser,user:null})
    setDoctorInfo({...doctorInfo,doctor:null})
    setAdminUser({...adminUser,admin:null})
    
    localStorage.removeItem("user");
    localStorage.removeItem("doctor");
    localStorage.removeItem("admin")
    toast.success("logout successfully")
    setTimeout(()=>{
      navigate('/login')
      window.location.reload()

    },2000)

  }
  return (
    <nav className='bg-blue-300 p-5 text-white sticky z-50 top-0'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to={'/'} onClick={closeMenu}>
          <h1 className='text-2xl font-extrabold  cursor-pointer'>QuickCare</h1>
        </Link>

        {/* Desktop Menu */}
        <ul className='hidden md:flex text-xl gap-10 font-bold cursor-pointer '>
          <Link to={'/'} onClick={closeMenu}><li>Home</li></Link>
          {authUser &&<Link to={'/alldoctors'} onClick={closeMenu}><li>All Doctors</li></Link>}
          {authUser &&(<Link to={'/AllAppointments'} onClick={closeMenu}><li>My Appointments</li></Link>)}
          {doctorInfo && !authUser &&(<Link to={'/checkAppointments'} onClick={closeMenu}><li>Check Appointments</li></Link>)}
          {adminUser &&(<Link to={'/addDoctor'} onClick={closeMenu}><li>Add Doctor</li></Link>)}
          {adminUser &&(<Link to={'/admin/getAllDoctors'} onClick={closeMenu}><li>All Doctor</li></Link>)}
          {!doctorInfo && !authUser && !adminUser &&(<Link to={'/doctorLogin'} onClick={closeMenu}><li>Doctor login</li></Link>)}
          {!doctorInfo && !authUser && !adminUser &&(<Link to={'/admin'} onClick={closeMenu}><li>Admin login</li></Link>)}
          
          {
                (doctorInfo || authUser) &&(<Link to={doctorInfo?'/Doctor_profile':'/userProfile'}><li className='pl-3'>Profile</li></Link>)
                
          }
          {(authUser || doctorInfo || adminUser)?
            <Link  onClick={() => { closeMenu(); logout(); }}><li className='pl-3 hover:text-red-500 font-bold  transition-transform'>Logout</li></Link>
            :<Link to={'/login'}  onClick={closeMenu}><li className='pl-3'>Login</li></Link>
          }
          
          
        </ul>

        {/* Mobile Menu Button */}
        <button className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
          <svg className='w-6 h-6' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16m-7 6h7'></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className='md:hidden flex flex-col items-center gap-4 p-4 bg-blue-300 text-white font-bold mt-2'>
          <Link to={'/'} onClick={closeMenu}><li>Home</li></Link>
          {authUser &&<Link to={'/alldoctors'} onClick={closeMenu}><li>All Doctors</li></Link>}
          {authUser &&(<Link to={'/AllAppointments'} onClick={closeMenu}><li>My Appointments</li></Link>)}
          {doctorInfo &&(<Link to={'/checkAppointments'} onClick={closeMenu}><li>check Appointments</li></Link>)}
          {adminUser &&(<Link to={'/addDoctor'} onClick={closeMenu}><li>Add Doctor</li></Link>)}
          {adminUser &&(<Link to={'/admin/getAllDoctors'} onClick={closeMenu}><li>All Doctor</li></Link>)}
          {!doctorInfo && !authUser && !adminUser &&(<Link to={'/doctorLogin'} onClick={closeMenu}><li>Doctor login</li></Link>)}
          {!doctorInfo && !authUser && !adminUser &&(<Link to={'/admin'} onClick={closeMenu}><li>Admin login</li></Link>)}
          <li onClick={closeMenu}>About Us</li>
          <li>
            <div className='dropdown dropdown-end'>
              <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
                <div className='w-10 rounded-full'>
                  <img
                    alt='User Avatar'
                    src='https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'
                  />
                </div>
              </div>
              <ul tabIndex={0} className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow bg-blue-500'>
              {
                (doctorInfo || authUser) &&(<Link to={doctorInfo?'/Doctor_profile':'/userProfile'} onClick={() => { closeMenu();}}><li className='pl-3'>Profile</li></Link>)
                
              }
                {authUser||doctorInfo || adminUser?
                <Link to={'/login'} onClick={() => { closeMenu(); logout(); }}><li className='pl-3'>Logout</li></Link>
                :<Link to={'/login'} onClick={closeMenu}><li className='pl-3'>Login</li></Link>
                }
              </ul>
            </div>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
