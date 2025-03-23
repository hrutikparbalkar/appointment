import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link ,useNavigate} from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { toast} from 'react-hot-toast';

const AllDoctors = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [doctorData, setDoctorData] = useState([]);
  const [speciality, setSpeciality] = useState("All Doctors");
  const [filterData, setFilterData] = useState([]);
  const [loading,setLoading]=useState(false);
  const [authUser,setAuthUser] = useAuth();
  const navigate = useNavigate();
  

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/allDoctor`);
      const data = await res.json();
      setDoctorData(data);
      setFilterData(data);
    };
    getData();
    setLoading(false);

  }, []);
  // console.log(doctorData);
  

  
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
  const handleDoctorClick=(id)=>{
    if (authUser){
      navigate(`/doctor/${id}`)
    }
    else{
      toast.error('Please login')
      navigate('/login')
    }

  }

  return (
    <>
    {
      loading?<div className="flex justify-center items-center min-h-screen"><ClipLoader color="#36D7B7" /></div>
      :

    <div>
      <p className="md:pt-4 text-gray-400 md:text-lg font-semibold md:text-start text-center">
        Browse through the doctors specialist.
      </p>

      <div className="md:hidden block ml-10 mt-3">
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


      <div className="md:flex md:gap-16">
        <div className="md:flex">
          <div className="hidden md:block">
            {["All Doctors", "General Physician", "Cardiologist", "Dermatologist", "Pediatrician"].map((spec, index) => (
              <p
                key={index}
                onClick={() => handleSpeciality(spec)}
                className="border py-2 cursor-pointer mt-3 hover:bg-gray-300 px-4 rounded-lg border-gray-500"
              >
                {spec}
              </p>
            ))}
          </div>
        </div>

       
        <div>
          <div className="md:grid md:grid-cols-4 grid-cols-1 justify-evenly mt-3 gap-16">
            {filterData.map((data, index) => (
              <div
                className="card bg-base-100 w-72 md:w-80 m-auto my-4 bg-slate-100 shadow-2xl transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer rounded-2xl"
                key={index} onClick={()=>handleDoctorClick(data._id)}
              >
                <figure className="px-10 pt-10">
                  <img src={data.img} alt="Doctor" className="rounded-xl" />
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
      }
    </>
  );
};

export default AllDoctors;
