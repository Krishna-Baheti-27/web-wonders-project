import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// --- Icon Components (Stable Definition) ---
const LocationPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
const PackageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m0 10l8 4m0 0l8-4m-8 4v-4"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 7v10l8 4 8-4V7L12 3 4 7z"
    />
  </svg>
);
const WeightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
    />
  </svg>
);
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);
const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

// --- TYPING FIX: InputField is now defined OUTSIDE the Parcel component ---
const InputField = ({
  icon,
  id,
  placeholder,
  value,
  onChange,
  type = "text",
}) => (
  <div className="relative">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      {icon}
    </span>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
      placeholder={placeholder}
    />
  </div>
);

// Define API URL - Corrected to port 4000
const API_URL = "http://localhost:4000/api/parcels";

const Parcel = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [packageType, setPackageType] = useState("document");
  const [weight, setWeight] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [fare, setFare] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Send a Parcel";
  }, []);

  const handleShowFare = async (e) => {
    e.preventDefault();
    setError("");
    if (!source || !destination || !weight || !senderName || !senderPhone) {
      setError("Please fill in all required fields.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/fare`, {
        source,
        destination,
        weight,
      });
      setFare(res.data.fare);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Error calculating fare. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestBooking = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const bookingDetails = {
        source,
        destination,
        packageType,
        weight,
        senderName,
        senderPhone,
        fare,
      };
      const res = await axios.post(`${API_URL}/book`, bookingDetails);
      if (res.status === 201) {
        setIsBooked(true);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Booking failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelFare = () => {
    setFare(null);
    setError("");
  };

  const handleNewBooking = () => {
    setSource("");
    setDestination("");
    setPackageType("document");
    setWeight("");
    setSenderName("");
    setSenderPhone("");
    setFare(null);
    setIsBooked(false);
    setError("");
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 font-sans flex items-center justify-center py-12 px-4 min-h-[calc(100vh-128px)]">
        {isBooked ? (
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl text-center max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-green-500 mb-4">
              Booking Confirmed!
            </h2>
            <p className="text-gray-600 mb-6">
              Your parcel from {source} to {destination} is scheduled. Thank you
              for using our service!
            </p>
            <button
              onClick={handleNewBooking}
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all"
            >
              Book Another Parcel
            </button>
          </div>
        ) : (
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Send a Parcel
            </h2>
            <p className="text-gray-500 mb-8">
              Enter details below for an instant quote.
            </p>

            <form className="space-y-6">
              <div className="space-y-4">
                <InputField
                  icon={<LocationPinIcon />}
                  id="source"
                  placeholder="Source Stop Name"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
                <InputField
                  icon={<LocationPinIcon />}
                  id="destination"
                  placeholder="Destination Stop Name"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <hr />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="packageType"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Package Type
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <PackageIcon />
                    </span>
                    <select
                      id="packageType"
                      value={packageType}
                      onChange={(e) => setPackageType(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                      <option value="document">Document</option>
                      <option value="small_box">Small Box</option>
                      <option value="large_box">Large Box</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="weight"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Weight (kg)
                  </label>
                  <InputField
                    icon={<WeightIcon />}
                    id="weight"
                    placeholder="0.5"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    type="number"
                  />
                </div>
              </div>
              <hr />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Sender Information
                </h3>
                <div className="space-y-4">
                  <InputField
                    icon={<UserIcon />}
                    id="senderName"
                    placeholder="Your Name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                  />
                  <InputField
                    icon={<PhoneIcon />}
                    id="senderPhone"
                    placeholder="Your Phone Number"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    type="tel"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <div className="pt-4 space-y-4">
                {fare && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-lg flex justify-between items-center">
                    <p className="font-semibold">Estimated Fare:</p>
                    <p className="text-2xl font-bold">₹{fare}</p>
                  </div>
                )}

                {!fare ? (
                  <button
                    onClick={handleShowFare}
                    disabled={isLoading}
                    className={`w-full text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center bg-blue-600 hover:bg-blue-700`}
                  >
                    {isLoading ? "Calculating..." : "Show Fare"}
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={handleRequestBooking}
                      disabled={isLoading}
                      className={`w-full text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center bg-green-500 hover:bg-green-600`}
                    >
                      {isLoading ? "Booking..." : "Confirm Booking"}
                    </button>
                    <button
                      onClick={handleCancelFare}
                      disabled={isLoading}
                      className={`w-full text-gray-700 bg-gray-200 font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50`}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Parcel;
