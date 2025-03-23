import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext/AuthContext'

const Header = () => {
  const [authUser,,doctorInfo,]=useAuth();
  return (
    <div className=' md:flex-row md:justify-around flex flex-col bg-teal-300'>
        {/* left */}
        <div className=''>
            <h1 className=' md:text-5xl text-2xl font-bold font-serif md:mt-44 mt-10 text-center text-white'>Book Appointment <br/>
            <h1 className=' pt-6 text-center'>With Trusted Doctors</h1></h1>
            <p className=' pt-3 font-semibold text-white md:text-lg hidden md:block'>Simply browse through our extensive list of trusted doctors,<br/>
            schedule your appointment hassle-free.</p>
            <div className=' mt-16'>
            <Link to={authUser || doctorInfo ? '/alldoctors' :'/login'}><button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg hidden md:block">Book Appointment</button></Link>
            </div>
        </div>
        {/* right */}
        <div >
            <div className=' md:mt-20 mt-10'>
            <img src="/images/header_img.png" alt="Header" className="w-full h-auto" />
            </div>
        </div>
    </div>
  )
}

export default Header