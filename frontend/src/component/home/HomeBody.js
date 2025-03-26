import React from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css'
const HomeBody = () => {
  Aos.init();
  return (
    <div className="py-8">
      <h1 className="text-center md:mt-8 mt-6 md:text-4xl text-2xl font-bold">
        Our Medical Services
      </h1>

      <div className="mt-10 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 px-4 md:px-16 "  data-aos="fade-right" data-aos-easing="ease-in-sine">
        {/* Mental Health */}
        <div className="bg-red-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-center">🧠 Mental Health</h2>
          <p className="text-center mt-2">
            Your mental well-being matters! Our experts provide therapy and counseling to help you manage stress, anxiety, and depression for a healthier mind.
          </p>
        </div>

        {/* Neurology */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-center">🩺 Neurology</h2>
          <p className="text-center mt-2">
            Specialized care for brain and nervous system disorders. Get expert consultations for migraines, epilepsy, stroke, and other neurological conditions.
          </p>
        </div>

        {/* Heart Disease */}
        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-center">❤️ Heart Disease</h2>
          <p className="text-center mt-2">
            Take care of your heart with our top cardiologists. From heart checkups to advanced treatments, we ensure the best cardiac care for a healthy life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeBody;
