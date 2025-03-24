import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import VerifiedIcon from "@mui/icons-material/Verified";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "../AuthContext/AuthContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

const DoctorDetail = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth();
  const { id } = useParams();
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  // console.log(authUser,id);

  const timeSlots = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
  ];
  useEffect(() => {
    const getDataById = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/doctor/${id}`);
        const data = await response.json();
        setDoctor(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };
    getDataById();
  }, [id]);

  const handleBooking = async () => {
    if (!selectedTime || !date) {
      toast.error("Please select date and time");
    }
    const appointmentData = {
      userId: authUser._id,
      doctorId: id,
      date: date,
      time: selectedTime,
    };
    try {
      const conformation = await Swal.fire({
        title: "Are you sure you want to book this appointment?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      });
      if (conformation.isConfirmed) {
        const response = await fetch(`${BACKEND_URL}/appointment`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(appointmentData),
        });
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          Swal.fire({
            title: "Conformed!",
            text: "Your appointment has been booked",
            icon: "success",
          });
          toast.success("Appointment booked successfully!");
          navigate("/AllAppointments");
        } else {
          toast.error(data.msg);
        }
      }
    } catch (error) {
      toast.error("Booking failed");
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <ClipLoader  color="#36D7B7" />
        </div>
      ) : (
        <div>
          <div className="md:grid md:grid-cols-4 mt-5 md:gap-10 mx-3 mb-3">
            {/* Doctor Info Section */}
            <div className="bg-blue-300 col-span-1 rounded-2xl p-4 flex justify-center">
              <img
                src={doctor.img}
                alt={doctor.name}
                className="rounded-lg w-full"
              />
            </div>

            <div className="md:col-span-3 cursor-pointer mt-3 md:mt-0">
              <div className="border border-gray-500 rounded-xl px-5 py-10">
                <h1 className="md:text-4xl text-2xl font-bold text-gray-600">
                  {doctor.name}
                </h1>
                <div className="mt-5">
                  <p className="text-xl font-medium text-gray-500 pt-3">
                    Speciality:{" "}
                    <span className="pl-3">{doctor.speciality}</span>
                  </p>
                  <p className="text-xl font-medium text-gray-500 pt-3">
                    Experience:{" "}
                    <span className="pl-3">
                      {doctor.experience} years{" "}
                      <VerifiedIcon fontSize="small" />
                    </span>
                  </p>
                </div>
                <div className="mt-5">
                  <p className="text-lg font-semibold pt-2">
                    About{" "}
                    <span className="pl-1">
                      <InfoIcon fontSize="small" color="grey" />
                    </span>
                  </p>
                  <p className="pt-4">{doctor.about}</p>
                </div>
                <p className="font-semibold text-lg pt-10">
                  Appointment Fee:{" "}
                  <span className="pl-1">
                    {doctor.fee} <CurrencyRupeeIcon fontSize="small" />
                  </span>
                </p>
              </div>
            </div>

            {/* Calendar & Time Slots Section */}
            <div className="md:col-span-4 flex flex-col md:flex-row mt-10 bg-white shadow-lg p-6 rounded-lg">
              {/* Calendar Section */}
              <div className="md:w-1/2">
                <h2 className="text-xl font-bold mb-4 text-center">
                  Select an Appointment Date
                </h2>
                <Calendar
                  onChange={setDate}
                  value={date}
                  // minDate={new Date()} // Disable past dates
                  className="border border-gray-300 rounded-lg p-4 w-full md:ml-56"
                />
                <p className="mt-4 text-lg font-medium text-center">
                  Selected Date:{" "}
                  <span className="text-blue-500">{date.toDateString()}</span>
                </p>
              </div>

              {/* Time Slots Section */}
              <div className="md:w-1/2 mt-6 md:mt-0 md:ml-10">
                <h2 className="text-xl font-bold mb-4 text-center">
                  Select a Time Slot
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {timeSlots.map((time, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-2 text-lg border rounded-lg transition ${
                        selectedTime === time
                          ? "bg-blue-500 text-white border-blue-500"
                          : "border-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                {selectedTime && (
                  <p className="mt-4 text-lg font-medium text-center">
                    Selected Time:{" "}
                    <span className="text-green-500">{selectedTime}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className=" flex justify-center mt-5 ">
            <button
              onClick={handleBooking}
              className="btn btn-wide bg-blue-500 md:my-5 my-3 md:py-7 hover:bg-blue-700 text-white font-bold "
            >
              Book An Appointment
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorDetail;
