import React, { useState, useEffect } from "react";
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  DollarSign, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Car, 
  CheckCircle, 
  Shield, 
  Leaf, 
  MessageCircle,
  Filter,
  Plus,
  AlertCircle,
  UserCheck,
  X,
  Menu,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail
} from 'lucide-react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Mock user context (replace with your actual context)
const mockUser = {
  _id: "user123",
  name: "John Doe",
  email: "john@example.com"
};

// Mock API functions (replace with your actual API calls)
const mockAPI = {
  getRides: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      {
        _id: "ride1",
        driver: { _id: "driver1", name: "Sarah Chen" },
        from: "Downtown",
        to: "University District",
        departureTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        seatsAvailable: 3,
        notes: "Small bags only, non-smoking",
        status: "active"
      },
      {
        _id: "ride2", 
        driver: { _id: "driver2", name: "Mike Rodriguez" },
        from: "Airport",
        to: "City Center", 
        departureTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        seatsAvailable: 2,
        notes: "Highway route, comfortable SUV",
        status: "active"
      },
      {
        _id: "ride3",
        driver: { _id: "user123", name: "John Doe" },
        from: "Suburbs",
        to: "Business District",
        departureTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
        seatsAvailable: 4,
        notes: "Morning commute, coffee stops welcome",
        status: "active"
      }
    ];
  },
  
  postRide: async (rideData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: "Ride posted successfully!" };
  },
  
  deleteRide: async (rideId, userId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },
  
  acceptRide: async (rideId, userId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
};





// Helper Icons (Preserved from original)
const CarIcon = () => (
  <Car className="h-5 w-5 mr-2 text-gray-500" />
);
const UserGroupIcon = () => (
  <Users className="h-5 w-5 mr-1" />
);
const ClockIcon = () => (
  <Clock className="h-5 w-5 mr-2 text-gray-500" />
);
const NoRidesIcon = () => (
  <div className="mx-auto h-24 w-24 text-blue-300 mb-4">
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  </div>
);

// Ride Offer Form Component (Enhanced UI, Mock API)
const OfferRideForm = ({ onRidePosted }) => {
  const [user] = useState(mockUser); // Using mock user
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [seatsAvailable, setSeatsAvailable] = useState(1);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);
    
    if (!user?._id) {
      setError("You must be logged in to offer a ride.");
      setIsSubmitting(false);
      return;
    }
    
    try {
      const rideData = {
        driver: user._id,
        from,
        to,
        departureTime,
        seatsAvailable,
        notes,
      };
      await mockAPI.postRide(rideData);
      setSuccess("Your ride has been posted successfully!");
      setFrom("");
      setTo("");
      setDepartureTime("");
      setSeatsAvailable(1);
      setNotes("");
      onRidePosted();
    } catch (err) {
      setError("Failed to post ride. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user?._id) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-teal-50 text-center p-8 rounded-2xl border border-blue-200 shadow-lg">
        <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <UserCheck className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-blue-800 mb-2">Login Required</h3>
        <p className="text-blue-600">Please log in to offer a ride to the community.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="bg-teal-100 rounded-lg p-3 mr-4">
          <Plus className="h-6 w-6 text-teal-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Offer a Ride</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">From Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="e.g., Vesu"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">To Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="e.g., Airport"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Departure Time</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="datetime-local"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Seats</label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="number"
                placeholder="Seats"
                value={seatsAvailable}
                onChange={(e) => setSeatsAvailable(e.target.value)}
                min="1"
                max="8"
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
          <textarea
            placeholder="e.g., 'Small bags only', 'Non-smoking', 'Pet-friendly'"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            rows="3"
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-900 to-teal-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-800 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? "Posting..." : "Post Ride Offer"}
        </button>
        
        {error && (
          <div className="flex items-center bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}
        {success && (
          <div className="flex items-center bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <span className="text-sm">{success}</span>
          </div>
        )}
      </form>
    </div>
  );
};

// Enhanced Ride Card Component
const RideCard = ({ ride, currentUserId, onCancel, onAccept }) => {
  const isDriver =
    !!currentUserId &&
    !!ride.driver?._id &&
    String(currentUserId) === String(ride.driver._id);
  const isBookedByCurrentUser = ride.acceptedBy === currentUserId;

  const getStatusInfo = () => {
    if (ride.status === "booked") {
      if (isDriver)
        return {
          text: "Booked by Rider",
          color: "bg-indigo-100 text-indigo-800",
          icon: <CheckCircle className="h-4 w-4 mr-1" />
        };
      if (isBookedByCurrentUser)
        return { 
          text: "You Accepted!", 
          color: "bg-green-100 text-green-800",
          icon: <CheckCircle className="h-4 w-4 mr-1" />
        };
    }
    return {
      text: `${ride.seatsAvailable} Seat${ride.seatsAvailable > 1 ? "s" : ""} Available`,
      color: "bg-blue-100 text-blue-800",
      icon: <Users className="h-4 w-4 mr-1" />
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-teal-200 transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <MapPin className="h-5 w-5 text-teal-600 mr-2" />
            <p className="font-bold text-lg text-gray-800">
              {ride.from} → {ride.to}
            </p>
          </div>
        </div>
        <div className={`flex items-center text-sm font-semibold px-3 py-2 rounded-full ${statusInfo.color}`}>
          {statusInfo.icon}
          {statusInfo.text}
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-3 text-gray-400" />
          <span className="text-sm font-medium">
            {new Date(ride.departureTime).toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            <span className="text-xs font-bold text-gray-600">
              {ride.driver.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm">
            Driver: <span className="font-semibold text-gray-800">{ride.driver.name}</span>
          </span>
        </div>
        
        {ride.notes && (
          <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-teal-400">
            <p className="text-sm text-gray-700">
              <MessageCircle className="h-4 w-4 inline mr-2 text-teal-600" />
              {ride.notes}
            </p>
          </div>
        )}
      </div>
      
      <div className="pt-4 border-t border-gray-100">
        {isDriver && ride.status === "active" && (
          <button
            onClick={() => onCancel(ride._id)}
            className="w-full bg-red-50 text-red-700 text-sm font-bold py-3 px-4 rounded-lg hover:bg-red-100 transition-colors border border-red-200 flex items-center justify-center"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel My Offer
          </button>
        )}
        {!isDriver && ride.status === "active" && (
          <button
            onClick={() => onAccept(ride._id)}
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white text-sm font-bold py-3 px-4 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Accept Ride
          </button>
        )}
      </div>
    </div>
  );
};

// Main Carpool Page Component
const CarpoolPage = () => {
  const [allRides, setAllRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useState(mockUser); // Using mock user

  const fetchRides = async () => {
    try {
      setLoading(true);
      const rides = await mockAPI.getRides();
      setAllRides(rides);
    } catch (error) {
      console.error("Failed to fetch rides:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const handleCancelRide = async (rideId) => {
    if (!user?._id) {
      alert("You must be logged in to cancel a ride.");
      return;
    }
    if (
      window.confirm(
        "Are you sure you want to permanently delete this ride offer?"
      )
    ) {
      try {
        await mockAPI.deleteRide(rideId, user._id);
        fetchRides();
      } catch (error) {
        console.error("Failed to delete ride:", error);
        alert("Could not delete the ride. Please try again.");
      }
    }
  };

  const handleAcceptRide = async (rideId) => {
    if (!user?._id) {
      alert("You must be logged in to accept a ride.");
      return;
    }
    try {
      await mockAPI.acceptRide(rideId, user._id);
      fetchRides();
    } catch (error) {
      console.error("Failed to accept ride:", error);
      alert("Could not accept the ride. It may no longer be available.");
    }
  };

  const myRideOffers = allRides.filter(
    (ride) => ride.driver?._id && String(ride.driver._id) === String(user?._id)
  );
  const otherRides = allRides.filter(
    (ride) => ride.driver?._id && String(ride.driver._id) !== String(user?._id)
  );

  return (
    <>
      <Navbar/>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r bg-royalblue text-white py-20">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Find Your Ride, Share the Journey
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Affordable, eco-friendly rides for everyone. Connect with fellow commuters and make every journey count.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
                <Leaf className="h-5 w-5 mr-2 text-green-300" />
                <span className="text-black font-medium font-roboto">Eco-Friendly</span>
              </div>
              <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
                <DollarSign className="h-5 w-5 mr-2 text-green-300" />
                <span className="text-black font-medium font-roboto">Save Money</span>
              </div>
              <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
                <Users className="h-5 w-5 mr-2 text-blue-300" />
                <span className="text-black font-medium font-roboto">Meet People</span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-teal-100 to-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Search className="h-10 w-10 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">1. Search & Offer</h3>
                <p className="text-gray-600">Find available rides or offer your own journey to fellow commuters</p>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">2. Connect & Book</h3>
                <p className="text-gray-600">Connect with verified drivers and secure your seat instantly</p>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Car className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">3. Ride & Enjoy</h3>
                <p className="text-gray-600">Meet your driver, enjoy the journey, and build community connections</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Offer Ride Form */}
            <div className="lg:col-span-2">
              <OfferRideForm onRidePosted={fetchRides} />
              
              {/* Feature Highlights */}
              <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Why Choose Our Platform?</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-teal-100 rounded-lg p-2 mr-3">
                      <Shield className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Verified Drivers</p>
                      <p className="text-sm text-gray-600">All drivers are background checked</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-lg p-2 mr-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Real-time Updates</p>
                      <p className="text-sm text-gray-600">Live ride availability and notifications</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-lg p-2 mr-3">
                      <Leaf className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Eco-Friendly</p>
                      <p className="text-sm text-gray-600">Reduce carbon footprint together</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Rides */}
            <div className="lg:col-span-3">
              {/* My Active Offers */}
              {user?._id && myRideOffers.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 rounded-lg p-3 mr-4">
                      <Car className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">My Active Offers</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myRideOffers.map((ride) => (
                      <RideCard
                        key={ride._id}
                        ride={ride}
                        currentUserId={user?._id}
                        onCancel={handleCancelRide}
                        onAccept={handleAcceptRide}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Available Rides from Others */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="bg-teal-100 rounded-lg p-3 mr-4">
                    <Users className="h-6 w-6 text-teal-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Available Rides</h2>
                </div>
                {otherRides.length > 0 && (
                  <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {otherRides.length} ride{otherRides.length !== 1 ? 's' : ''} available
                  </div>
                )}
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading available rides...</p>
                </div>
              ) : otherRides.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {otherRides.map((ride) => (
                    <RideCard
                      key={ride._id}
                      ride={ride}
                      currentUserId={user?._id}
                      onCancel={handleCancelRide}
                      onAccept={handleAcceptRide}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                  <NoRidesIcon />
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Rides Available</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    There are no other active rides available right now. Be the first to offer one and help build our carpooling community!
                  </p>
                  <div className="flex justify-center space-x-2">
                    <div className="flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Offer a ride to get started
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer/>
    </>
  );
};

export default CarpoolPage;