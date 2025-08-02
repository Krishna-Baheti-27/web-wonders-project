import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// --- Helper Icons ---
const BusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v11.494m-9-5.494h18"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 18a6 6 0 100-12 6 6 0 000 12z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 12H5"
    />
  </svg>
);
const MetroIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 21a9 9 0 100-18 9 9 0 000 18z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 12h14"
    />
  </svg>
);
const TimeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const ChevronDownIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 transition-transform duration-300 ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

// --- Timetable Generation Logic ---
const generateTimetable = (startTime, endTime, frequency) => {
  const times = [];
  let [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  let currentTime = new Date();
  currentTime.setHours(startHour, startMinute, 0, 0);

  const endTimeObj = new Date();
  endTimeObj.setHours(endHour, endMinute, 0, 0);

  while (currentTime <= endTimeObj) {
    times.push(
      currentTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
    currentTime.setMinutes(currentTime.getMinutes() + frequency);
  }
  return times;
};

// --- Main Schedules Page Component ---
const Schedules = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/routes");
        setRoutes(response.data);
      } catch (err) {
        setError("Failed to fetch route schedules. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoutes();
  }, []);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const getRouteIcon = (type) => {
    switch (type) {
      case "bus":
        return <BusIcon />;
      case "metro":
        return <MetroIcon />;
      default:
        return <div className="w-6 h-6" />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
            Route Schedules
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Browse all available routes and view their stops and timetables.
          </p>

          {loading && (
            <p className="text-center text-gray-500 text-lg">
              Loading schedules...
            </p>
          )}
          {error && <p className="text-center text-red-500 text-lg">{error}</p>}

          {!loading && !error && (
            <div className="space-y-4">
              {routes.map((route, index) => (
                <div
                  key={route.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
                  >
                    <div className="flex items-center">
                      <div
                        className="p-2 rounded-full mr-4"
                        style={{
                          backgroundColor: `${route.color}20`,
                          color: route.color,
                        }}
                      >
                        {getRouteIcon(route.type)}
                      </div>
                      <span className="text-xl font-semibold text-gray-800">
                        {route.name}
                      </span>
                    </div>
                    <ChevronDownIcon
                      className={activeIndex === index ? "rotate-180" : ""}
                    />
                  </button>

                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      activeIndex === index ? "max-h-screen" : "max-h-0"
                    }`}
                  >
                    <div className="border-t border-gray-200 p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Column 1: Stops */}
                      <div className="md:col-span-1">
                        <h3 className="text-lg font-bold text-gray-700 mb-4">
                          Stops
                        </h3>
                        <ul className="space-y-2">
                          {route.stops.map((stop, stopIndex) => (
                            <li
                              key={stopIndex}
                              className="flex items-center text-gray-600"
                            >
                              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                              {stop.name}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 2: Timetable */}
                      <div className="md:col-span-2">
                        <h3 className="text-lg font-bold text-gray-700 mb-4">
                          Timetable
                        </h3>
                        <div className="flex items-center text-gray-600 mb-4">
                          <TimeIcon />
                          <span>
                            First trip at{" "}
                            {new Date(
                              `1970-01-01T${route.startTime}`
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            , every {route.frequency} minutes.
                          </span>
                        </div>
                        <div className="max-h-60 overflow-y-auto bg-gray-50 p-4 rounded-lg grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                          {generateTimetable(
                            route.startTime,
                            route.endTime,
                            route.frequency
                          ).map((time, timeIndex) => (
                            <span
                              key={timeIndex}
                              className="bg-white text-center py-1 px-2 rounded-md shadow-sm text-gray-700"
                            >
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Schedules;
