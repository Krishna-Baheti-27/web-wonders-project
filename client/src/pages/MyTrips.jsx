import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  MapPin,
  Clock,
  DollarSign,
  Star,
  ArrowRight,
  Calendar,
  Car,
  Truck,
  Users,
  Shield,
  Zap,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Navigation,
  CheckCircle,
  Heart,
  Leaf,
} from "lucide-react";
import Footer from "../components/Footer";

const MyTripsPage = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [customTrip, setCustomTrip] = useState({
    from: "",
    to: "",
    date: "",
    vehicleType: "",
  });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [likedTrips, setLikedTrips] = useState([]); // ❤️ New state for liked trips

  const toggleLike = (tripId) => {
    setLikedTrips((prevLikedTrips) =>
      prevLikedTrips.includes(tripId)
        ? prevLikedTrips.filter((id) => id !== tripId)
        : [...prevLikedTrips, tripId]
    );
  };

  const preMadeTrips = [
    {
      id: 1,
      name: "City Explorer",
      description: "Discover urban landmarks and cultural hotspots",
      duration: "8 hours",
      price: "$149",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop",
      features: ["Professional Guide", "Lunch Included", "Photo Stops"],
    },
    {
      id: 2,
      name: "Mountain Adventure",
      description: "Scenic mountain routes with breathtaking views",
      duration: "12 hours",
      price: "$299",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      features: ["Mountain Guide", "Equipment Included", "Safety Briefing"],
    },
    {
      id: 3,
      name: "Coastal Journey",
      description: "Beautiful coastline drive with beach stops",
      duration: "10 hours",
      price: "$199",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop",
      features: ["Beach Access", "Snorkeling Gear", "Sunset Views"],
    },
    {
      id: 4,
      name: "Historic Route",
      description: "Journey through historical landmarks and sites",
      duration: "6 hours",
      price: "$129",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=250&fit=crop",
      features: ["History Expert", "Museum Passes", "Cultural Sites"],
    },
    {
      id: 5,
      name: "Nature Expedition",
      description: "Wildlife viewing and natural park exploration",
      duration: "14 hours",
      price: "$349",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
      features: ["Wildlife Guide", "Binoculars", "Park Entry"],
    },
    {
      id: 6,
      name: "Wine Country Tour",
      description: "Premium vineyard visits and wine tasting",
      duration: "9 hours",
      price: "$259",
      image:
        "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=250&fit=crop",
      features: ["Wine Expert", "Tastings", "Gourmet Lunch"],
    },
  ];

  const features = [
    {
      icon: Navigation,
      title: "Real-time Vehicle Tracking",
      description:
        "Track your ride live on the map and get real-time updates on your journey's progress.",
    },
    {
      icon: CheckCircle,
      title: "Flexible Booking",
      description:
        "Easily modify or cancel your trips with our user-friendly booking management system.",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Options",
      description:
        "Choose from electric and hybrid vehicles to reduce your carbon footprint while traveling.",
    },
    {
      icon: Phone,
      title: "24/7 Customer Support",
      description:
        "Get help anytime during your travels with our dedicated support team available around the clock.",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Amazing experience! The Mountain Adventure trip was perfectly organized and the views were breathtaking.",
      location: "San Francisco, CA",
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 5,
      comment:
        "Professional service and comfortable vehicles. The real-time tracking feature gave me peace of mind.",
      location: "Seattle, WA",
    },
    {
      id: 3,
      name: "Emma Davis",
      rating: 4,
      comment:
        "Great value for money. The custom trip planner made it easy to create exactly what we wanted.",
      location: "Portland, OR",
    },
  ];

  const vehicleTypes = [
    { id: "sedan", name: "Sedan", icon: Car },
    { id: "suv", name: "SUV", icon: Truck },
    { id: "van", name: "Van", icon: Users },
  ];

  const handleCustomTripSubmit = () => {
    if (
      customTrip.from &&
      customTrip.to &&
      customTrip.date &&
      customTrip.vehicleType
    ) {
      alert(
        `Custom trip planned from ${customTrip.from} to ${customTrip.to} on ${customTrip.date} using ${customTrip.vehicleType}`
      );
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Trip Selection Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose a Pre-Made Trip
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select from our carefully curated collection of amazing trips,
              each designed to provide unforgettable experiences and memories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {preMadeTrips.map((trip) => (
              <div
                key={trip.id}
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
                      onClick={() => toggleLike(trip.id)}
                      className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          likedTrips.includes(trip.id)
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
                      <DollarSign className="h-4 w-4" />
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

                  <button
                    onClick={() => setSelectedTrip(trip)}
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Select Trip</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ...rest of your component (Hero, Features, Custom Trip, Testimonials, Footer)... */}

      <Footer />
    </div>
  );
};

export default MyTripsPage;
