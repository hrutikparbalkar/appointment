import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext/AuthContext'
import 'animate.css';

const Header = () => {
  const [authUser,,doctorInfo,]=useAuth();
  return (
    <div className=' md:flex-row md:justify-around flex flex-col bg-teal-300'>
        {/* left */}
        <div className=''>
            <h1 className=' animate__animated animate__backInLeft animate__delay-0.5s  md:text-2xl lg:text-3xl xl:text-5xl text-2xl font-bold font-serif md:mt-44 mt-10 text-center text-white '>Book Appointment <br/>
            <h1 className=' pt-6 text-center'>With Trusted Doctors</h1></h1>
            <p className=' animate__animated animate__backInLeft animate pt-3 font-semibold xl:pl-3 text-white md:text-xs xl:text-lg lg:text-sm md:pl-6 lg:pl-10 hidden md:block'>Simply browse through our extensive list of trusted doctors,<br/>
            schedule your appointment hassle-free.</p>
            <div className=' lg:mt-24 md:mt-10'>
            <Link to={authUser || doctorInfo ? '/alldoctors' :'/login'}><button className=" animate__animated animate__backInLeft animate btn btn-xs  sm:btn-sm md:btn-md lg:btn-lg hidden md:block md:my-4 md:mx-6">Book Appointment</button></Link>
            </div>
        </div>
        {/* right */}
        <div >
            <div className=' md:mt-20 mt-10 animate__animated animate__slideInRight animate__delay-0.5s'>
            <img src="/images/header_img.png" alt="Header" className="w-full h-auto md:w-96 md:h-72 lg:w-full lg:h-auto" />
            </div>
        </div>
    </div>
  )
}

export default Header