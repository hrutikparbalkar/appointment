import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import InfoIcon from '@mui/icons-material/Info';
import { ClipLoader } from "react-spinners";


const DoctorProfile = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [, , doctorInfo] = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getDoctorProfileData = async () => {
      if (!doctorInfo?._id) return;  

      try {
        const response = await fetch(`${BACKEND_URL}/doctorDetails/${doctorInfo._id}`);
        if (!response.ok) throw new Error('Failed to fetch profile data');

        const data = await response.json();
        setProfile(data.doctor);
      } catch (error) {
        console.error('Error fetching doctor profile:', error);
      }
    };

    getDoctorProfileData();
  }, [doctorInfo]);

  if (!profile) {
    return <div className="flex justify-center items-center min-h-screen"><ClipLoader color="#36D7B7" /></div>
  }

  return (
    <div className="container mx-auto mt-10 p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          
          {/* Doctor Image */}
          <div className="bg-blue-200 flex justify-center items-center p-6">
            <img
              src={profile.img}
              alt={profile.name}
              className="w-72 h-72 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Doctor Info */}
          <div className="md:col-span-2 p-8">
            <h1 className="text-4xl font-bold text-gray-800">{profile.name}</h1>
            <p className="text-lg text-gray-500 mt-2">
              <span className="font-semibold">Speciality:</span> {profile.speciality}
            </p>
            <p className="text-lg text-gray-500 mt-2">
              <span className="font-semibold">Experience:</span> {profile.experience} years <VerifiedIcon fontSize="small" />
            </p>
            <p className="text-lg text-gray-500 mt-2">
              <span className="font-semibold">Fee:</span> {profile.fee} <CurrencyRupeeIcon fontSize="small" />
            </p>

            <div className="mt-5">
              <h2 className="text-2xl font-semibold">About the Doctor</h2>
              <p className="text-gray-600 mt-3">{profile.about}</p>
            </div>

            {/* Edit Button */}
            <div className="mt-6">
              <button
                onClick={() => navigate(`/editDoctorProfile/${doctorInfo._id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md shadow-lg transition duration-300"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-8 bg-gray-50 border-t mt-5">
          <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
          <p className="text-gray-600 mt-3"><InfoIcon fontSize="small" /> <span className="font-medium">Email:</span> {profile.email || 'N/A'}</p>
          <p className="text-gray-600 mt-3"><InfoIcon fontSize="small" /> <span className="font-medium">Phone:</span> {profile.contact || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
