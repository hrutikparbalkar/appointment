import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { toast } from 'react-hot-toast';

const AllDoctors = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [doctorData, setDoctorData] = useState([]);
  const [speciality, setSpeciality] = useState("All Doctors");
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/allDoctor`);
      const data = await res.json();
      setDoctorData(data);
      setFilterData(data);
      setLoading(false);
    };
    getData();
  }, []);

  const handleSpeciality = (spec) => {
    setLoading(true);
    setSpeciality(spec);
    if (spec === "All Doctors") {
      setFilterData(doctorData);
    } else {
      const filter = doctorData.filter((data) => data.speciality === spec);
      setFilterData(filter);
    }
    setLoading(false);
  };

  const handleDoctorClick = (id) => {
    if (authUser) {
      navigate(`/doctor/${id}`);
    } else {
      toast.error('Please login');
      navigate('/login');
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <ClipLoader color="#36D7B7" />
        </div>
      ) : (
        <div className="p-4 md:p-8">
          <p className="md:pt-4 text-gray-400 md:text-lg font-semibold md:text-start text-center">
            Browse through the doctors specialist.
          </p>

          {/* Mobile Dropdown */}
          <div className="md:hidden block ml-4 mt-3">
            <select
              className="select w-full max-w-xs border p-2 rounded-md"
              value={speciality}
              onChange={(e) => handleSpeciality(e.target.value)}
            >
              <option value="All Doctors">All Doctors</option>
              <option value="General Physician">General Physician</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatrician">Pediatrician</option>
            </select>
          </div>

          <div className="flex flex-col md:flex-row md:gap-10">
            {/* Sidebar for Desktop */}
            <div className="hidden md:flex md:flex-col md:w-1/4">
              {["All Doctors", "General Physician", "Cardiologist", "Dermatologist", "Pediatrician"].map((spec, index) => (
                <p
                  key={index}
                  onClick={() => handleSpeciality(spec)}
                  className="border py-2 cursor-pointer mt-3 hover:bg-gray-300 px-4 rounded-lg border-gray-500 transition duration-200"
                >
                  {spec}
                </p>
              ))}
            </div>

            {/* Doctors Grid */}
            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
                {filterData.map((data, index) => (
                  <div
                    className="card bg-base-100 w-full max-w-sm mx-auto bg-slate-100 shadow-2xl transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer rounded-2xl"
                    key={index}
                    onClick={() => handleDoctorClick(data._id)}
                  >
                    <figure className="px-6 pt-6">
                      <img src={data.img} alt="Doctor" className="rounded-xl w-full h-48 object-cover" />
                    </figure>
                    <div className="card-body items-center text-center">
                      <h2 className="card-title">{data.name}</h2>
                      <p className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Available
                      </p>
                      <p className="text-sm font-medium">{data.speciality}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllDoctors;
