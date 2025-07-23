import { useState, useEffect } from "react";
import { AlertCircle, BusFront, Car, MapPinned } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import homeIllustration from "./Assets/home-illustration.png";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Home";
  });
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10 bg-white min-h-[80vh]">
        {/* Left Side */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-snug">
            Go anywhere from your place
          </h1>

          {/* Input Fields */}
          <div className="space-y-3">
            <div className="flex items-center bg-gray-100 px-4 py-3 rounded-md">
              <span className="w-2 h-2 bg-black rounded-full mr-3" />
              <input
                type="text"
                placeholder="From location"
                className="bg-transparent outline-none w-full text-gray-700"
              />
              <span className="text-xl">📍</span>
            </div>

            <div className="flex items-center bg-gray-100 px-4 py-3 rounded-md">
              <span className="w-2 h-2 bg-black rounded-sm mr-3" />
              <input
                type="text"
                placeholder="To location"
                className="bg-transparent outline-none w-full text-gray-700"
              />
            </div>

            <div className="flex gap-3">
              <div className="flex items-center bg-gray-100 px-4 py-3 rounded-md w-full">
                <span className="mr-2">📅</span>
                <span className="text-gray-700">Today</span>
              </div>
              <div className="flex items-center bg-gray-100 px-4 py-3 rounded-md w-full">
                <span className="mr-2">🕒</span>
                <span className="text-gray-700">Now</span>
                <span className="ml-auto">▼</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-6 mt-4">
            <button className="bg-royalblue text-white px-4 py-2 rounded hover:bg-cyan transition">
              Get Started
            </button>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src={homeIllustration} 
            alt="Hero illustration"
            className="w-[500px] h-auto rounded-2xl shadow-xl"
          />
        </div>
      </section>

      <section
        className="bg-red-100 text-red-800 px-4 py-2 flex items-center gap-2 text-sm"
        data-aos="fade-up"
      >
        <AlertCircle className="w-5 h-5" />
        Route 5 is delayed by 15 mins due to traffic.
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-12 text-center">
        <div
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          data-aos="fade-up"
        >
          <MapPinned className="mx-auto mb-3 text-blue-500 w-10 h-10 animate-bounce" />
          <h3 className="font-semibold text-xl mb-2">Live Route Map</h3>
          <p>Click on any route to see stops and estimated arrival times.</p>
        </div>
        <div
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <BusFront className="mx-auto mb-3 text-green-500 w-10 h-10 animate-bounce" />
          <h3 className="font-semibold text-xl mb-2">Live Timetable</h3>
          <p>Get real-time or mock updates for bus and metro arrivals.</p>
        </div>
        <div
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <Car className="mx-auto mb-3 text-purple-500 w-10 h-10 animate-bounce" />
          <h3 className="font-semibold text-xl mb-2">Fare Calculator</h3>
          <p>
            Calculate your journey cost easily with distance and discount
            inputs.
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
