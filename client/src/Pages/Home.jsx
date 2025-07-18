import { useState, useEffect } from "react";
import { AlertCircle, BusFront, Car, MapPinned } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Home";
    })
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section
  className="relative h-[60vh] bg-[url('/map-placeholder.jpg')] bg-cover bg-center flex flex-col justify-center items-center text-center"
  data-aos="fade-up"
>
  <div className="bg-white/90 p-6 rounded-xl shadow-xl max-w-2xl w-full">
    <h2 className="text-3xl font-bold mb-4">Find Your Best Route</h2>
    <div className="flex flex-col md:flex-row gap-3">
      <input
              type="text"
              placeholder="From (e.g. Campus Gate)"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="To (e.g. City Center)"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full md:w-auto"
            >
              Search
            </button>
    </div>
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
  <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition" data-aos="fade-up">
    <MapPinned className="mx-auto mb-3 text-blue-500 w-10 h-10" />
    <h3 className="font-semibold text-xl mb-2">Live Route Map</h3>
    <p>Click on any route to see stops and estimated arrival times.</p>
  </div>
  <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition" data-aos="fade-up" data-aos-delay="100">
    <BusFront className="mx-auto mb-3 text-green-500 w-10 h-10" />
    <h3 className="font-semibold text-xl mb-2">Live Timetable</h3>
    <p>Get real-time or mock updates for bus and metro arrivals.</p>
  </div>
  <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition" data-aos="fade-up" data-aos-delay="200">
    <Car className="mx-auto mb-3 text-purple-500 w-10 h-10" />
    <h3 className="font-semibold text-xl mb-2">Fare Calculator</h3>
    <p>Calculate your journey cost easily with distance and discount inputs.</p>
  </div>
</section>

      {/* Footer */}
      <Footer />
    </div>
  );
}


export default Home;