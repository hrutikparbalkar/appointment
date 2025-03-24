import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import Aos from 'aos';
import 'aos/dist/aos.css'

const ExpertDoctors = () => {
  Aos.init();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [ExpertDoctors, setExpertDoctors] = useState([]);
  const [authUser, , doctorInfo] = useAuth();

  useEffect(() => {
    const getExperData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/admin/expertDoctor`);
        const data = await response.json();
        setExpertDoctors(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getExperData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-2xl md:text-4xl font-bold mb-8">
        Top Doctors to Book
      </h1>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3" data-aos="fade-up" data-aos-duration="3000">
        {ExpertDoctors.slice(0, 3).map((data, index) => (
          <Link
            to={authUser || doctorInfo ? "/alldoctors" : "/login"}
            key={index}
            className="transform transition duration-300 hover:scale-105"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <figure className="flex justify-center items-center w-full h-64 bg-gray-100">
                <img
                  src={data.img}
                  alt={data.name}
                  className="max-w-full max-h-full object-contain"
                />
              </figure>
              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold">{data.name}</h2>
                <p className="text-gray-600">{data.speciality}</p>
                <div className="mt-4">
                  <button className="btn btn-primary w-full">
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExpertDoctors;
