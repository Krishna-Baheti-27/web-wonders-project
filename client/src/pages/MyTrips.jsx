import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, DollarSign, ArrowRight, Heart } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
// Removed unused imports and Navbar/Footer as they are in App.jsx now

const MyTripsPage = () => {
  const [trips, setTrips] = useState([]); // State for trips from API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likedTrips, setLikedTrips] = useState([]);

  // Fetch trips from the API when the component mounts
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/trips");
        setTrips(response.data);
      } catch (err) {
        setError("Could not load trips. Please try again later.");
        console.error("Failed to fetch trips:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const toggleLike = (tripId) => {
    setLikedTrips((prev) =>
      prev.includes(tripId)
        ? prev.filter((id) => id !== tripId)
        : [...prev, tripId]
    );
  };

  return (
      <div className="min-h-screen bg-gray-50">
    <Navbar/>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Next Adventure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select from our collection of amazing trips, each designed to
              provide unforgettable experiences.
            </p>
          </div>

          {loading && <p className="text-center">Loading trips...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Map over the 'trips' state variable from the API */}
              {trips.map((trip) => (
                <div
                  key={trip._id} // Use _id from MongoDB
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => toggleLike(trip._id)}
                        className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all"
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            likedTrips.includes(trip._id)
                              ? "text-red-500 fill-red-500"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {trip.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{trip.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{trip.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-green-600 font-bold">
                        <span>{trip.price}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {trip.features.map((feature, index) => (
                          <span
                            key={index}
                            className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      to={trip._id}
                      className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Select Trip</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer/>
      {/* ...rest of your component ... */}
    </div>
  );
};

export default MyTripsPage;
