import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
const ExpertDoctors = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [ExpertDoctors, setExpertDoctors] = useState([]);
  const [authUser,,doctorInfo,]=useAuth();
  useEffect(() => {
    const getExperData = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/admin/expertDoctor`
        );
        const data = await response.json();
        setExpertDoctors(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getExperData();
  }, []);
  

  return (
    <div className="">
      <h1 className="text-center md:mt-8 mt-6 md:text-4xl text-2xl font-bold">
        Top Doctors to Book
      </h1>

      <div className=" md:grid md:grid-cols-3 grid-cols-1 justify-evenly mt-5 md:mt-16">
        {ExpertDoctors.slice(0, 3).map((data, index) => {
          return (
            <Link to={authUser || doctorInfo ?"/alldoctors":'/login'}>
              <div
                className="card bg-base-100 w-96 shadow-2xl cursor-pointe transform transition-transform duration-300 hover:-translate-y-2 "
                key={index}
              >
                <figure className="px-10 pt-10">
                  <img src={data.img} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{data.name}</h2>
                  <div className="card-actions">
                    <button className="btn btn-primary">
                      {data.speciality}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ExpertDoctors;
