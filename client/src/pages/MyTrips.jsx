import React, { useState } from 'react';
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
  Leaf
} from 'lucide-react';
import Footer from '../components/Footer';

const MyTripsPage = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [customTrip, setCustomTrip] = useState({
    from: '',
    to: '',
    date: '',
    vehicleType: ''
  });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const preMadeTrips = [
    {
      id: 1,
      name: "City Explorer",
      description: "Discover urban landmarks and cultural hotspots",
      duration: "8 hours",
      price: "$149",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop",
      features: ["Professional Guide", "Lunch Included", "Photo Stops"]
    },
    {
      id: 2,
      name: "Mountain Adventure",
      description: "Scenic mountain routes with breathtaking views",
      duration: "12 hours",
      price: "$299",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      features: ["Mountain Guide", "Equipment Included", "Safety Briefing"]
    },
    {
      id: 3,
      name: "Coastal Journey",
      description: "Beautiful coastline drive with beach stops",
      duration: "10 hours",
      price: "$199",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop",
      features: ["Beach Access", "Snorkeling Gear", "Sunset Views"]
    },
    {
      id: 4,
      name: "Historic Route",
      description: "Journey through historical landmarks and sites",
      duration: "6 hours",
      price: "$129",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=250&fit=crop",
      features: ["History Expert", "Museum Passes", "Cultural Sites"]
    },
    {
      id: 5,
      name: "Nature Expedition",
      description: "Wildlife viewing and natural park exploration",
      duration: "14 hours",
      price: "$349",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
      features: ["Wildlife Guide", "Binoculars", "Park Entry"]
    },
    {
      id: 6,
      name: "Wine Country Tour",
      description: "Premium vineyard visits and wine tasting",
      duration: "9 hours",
      price: "$259",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=250&fit=crop",
      features: ["Wine Expert", "Tastings", "Gourmet Lunch"]
    }
  ];

  const features = [
    {
      icon: Navigation,
      title: "Real-time Vehicle Tracking",
      description: "Track your ride live on the map and get real-time updates on your journey's progress."
    },
    {
      icon: CheckCircle,
      title: "Flexible Booking",
      description: "Easily modify or cancel your trips with our user-friendly booking management system."
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Options",
      description: "Choose from electric and hybrid vehicles to reduce your carbon footprint while traveling."
    },
    {
      icon: Phone,
      title: "24/7 Customer Support",
      description: "Get help anytime during your travels with our dedicated support team available around the clock."
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Amazing experience! The Mountain Adventure trip was perfectly organized and the views were breathtaking.",
      location: "San Francisco, CA"
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 5,
      comment: "Professional service and comfortable vehicles. The real-time tracking feature gave me peace of mind.",
      location: "Seattle, WA"
    },
    {
      id: 3,
      name: "Emma Davis",
      rating: 4,
      comment: "Great value for money. The custom trip planner made it easy to create exactly what we wanted.",
      location: "Portland, OR"
    }
  ];

  const vehicleTypes = [
    { id: 'sedan', name: 'Sedan', icon: Car },
    { id: 'suv', name: 'SUV', icon: Truck },
    { id: 'van', name: 'Van', icon: Users }
  ];

  const handleCustomTripSubmit = () => {
    if (customTrip.from && customTrip.to && customTrip.date && customTrip.vehicleType) {
      alert(`Custom trip planned from ${customTrip.from} to ${customTrip.to} on ${customTrip.date} using ${customTrip.vehicleType}`);
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar/>
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-900 to-cyan-500 flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=400&fit=crop')"
          }}
        ></div>
        <div className="relative text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Plan Your Next Adventure</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Discover amazing destinations with our premium transportation services. 
            Choose from pre-made trips or create your own custom journey.
          </p>
          <button className="bg-royalblue hover:bg-cyan-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors">
            Explore Trips
          </button>
        </div>
      </section>

      {/* Trip Selection Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose a Pre-Made Trip</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select from our carefully curated collection of amazing trips, each designed to provide 
              unforgettable experiences and memories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {preMadeTrips.map((trip) => (
              <div key={trip.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={trip.image} 
                    alt={trip.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <button className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{trip.name}</h3>
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
                        <span key={index} className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-full">
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

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Travel With Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our premium features designed to make your journey comfortable, 
              safe, and memorable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 text-center">
                <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Trip Planner */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Create Your Custom Trip</h2>
            <p className="text-xl text-gray-600">
              Design your perfect journey by selecting your preferred locations, dates, and vehicle type.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Starting location"
                    value={customTrip.from}
                    onChange={(e) => setCustomTrip({...customTrip, from: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Destination"
                    value={customTrip.to}
                    onChange={(e) => setCustomTrip({...customTrip, to: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Travel Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={customTrip.date}
                    onChange={(e) => setCustomTrip({...customTrip, date: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Type</label>
                <select
                  value={customTrip.vehicleType}
                  onChange={(e) => setCustomTrip({...customTrip, vehicleType: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select vehicle type</option>
                  {vehicleTypes.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.name}>{vehicle.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleCustomTripSubmit}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>Plan My Trip</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">
              Read reviews from travelers who have experienced our exceptional service.
            </p>
          </div>

          <div className="relative bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-gray-700 mb-6 italic">
                "{testimonials[currentTestimonial].comment}"
              </blockquote>
              <div>
                <p className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</p>
                <p className="text-gray-600">{testimonials[currentTestimonial].location}</p>
              </div>
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 p-2 rounded-full shadow-md"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 p-2 rounded-full shadow-md"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
      
    </div>
  );
};

export default MyTripsPage;