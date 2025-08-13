import React, { useState, useEffect } from "react";
import {
  Navigation,
  Route,
  Menu,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const InteractiveMapWebsite = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "LiveMap";
  });

  const [routes, setRoutes] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [matchedRoute, setMatchedRoute] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/routes");
        setRoutes(response.data);
      } catch (err) {
        setError("Failed to fetch route schedules. Please try again later.");
        console.error(err);
      } finally {
      }
    };
    fetchRoutes();
  }, []);


  const handleSearch = () => {
    const lowerFrom = from.toLowerCase();
    const lowerTo = to.toLowerCase();
    const found = routes.find((route) => {
      const stopNames = route.stops.map((s) => s.name.toLowerCase());
      return stopNames.includes(lowerFrom) && stopNames.includes(lowerTo);
    });


    setMatchedRoute(found || null);
  };

  const defaultCenter = [21.1645, 72.785];

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Navbar />
      <div className="h-screen flex bg-gray-100 ">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "w-96" : "w-0"
          } transition-all duration-300 bg-white shadow-xl z-30 overflow-hidden`}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Navigation className="h-6 w-6" />
                <h1 className="text-xl font-bold">RouteMap</h1>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 hover:bg-blue-700 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Route Input */}
              <div className="p-4 space-y-4 border-b">
                <h2 className="text-lg font-semibold text-gray-800">
                  Plan Your Route
                </h2>

                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute left-3 top-3 w-3 h-3 bg-green-500 rounded-full"></div>
                    <input
                      type="text"
                      placeholder="From"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute left-3 top-3 w-3 h-3 bg-red-500 rounded-full"></div>
                    <input
                      type="text"
                      placeholder="To"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSearch}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Route className="h-5 w-5" />
                  <span>Get Directions</span>
                </button>
              </div>

              {/* Route Information */}
              {/* {from && to && (
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Route Details
                  </h3>
                  <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">Duration:</span>
                      </div>
                      <span className="font-semibold text-blue-600">
                        {routeInfo.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Ruler className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">Distance:</span>
                      </div>
                      <span className="font-semibold">
                        {routeInfo.distance}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">Traffic:</span>
                      </div>
                      <span className="font-semibold text-green-600">
                        {routeInfo.traffic}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={saveCurrentRoute}
                      className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1"
                    >
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">Save</span>
                    </button>
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1">
                      <Share className="h-4 w-4" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>

        {/* Main Map Area */}
        <div className="flex-1 relative">
          {/* Mobile Menu Button */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="absolute top-4 left-4 z-20 bg-white hover:bg-gray-50 p-3 rounded-lg shadow-lg lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          {/* Map Controls */}
          {/* <div className="absolute top-4 right-4 z-20 space-y-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <button className="block w-full p-3 hover:bg-gray-50 transition-colors">
                <Plus className="h-5 w-5 mx-auto" />
              </button>
              <div className="border-t border-gray-200"></div>
              <button className="block w-full p-3 hover:bg-gray-50 transition-colors">
                <Minus className="h-5 w-5 mx-auto" />
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-3">
              <button className="block w-full hover:bg-gray-50 p-2 rounded transition-colors">
                <RotateCcw className="h-5 w-5 mx-auto" />
              </button>
            </div>
          </div> */}

          {/* Map Legend */}
          {/* <div className="absolute bottom-4 left-4 z-20 bg-white rounded-lg shadow-lg p-4 max-w-xs">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <Layers className="h-4 w-4 mr-2" />
              Map Legend
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-1 bg-blue-500 rounded"></div>
                <span className="text-gray-600">Main route</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-1 bg-gray-400 rounded"></div>
                <span className="text-gray-600">Alternative route</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-1 bg-red-500 rounded"></div>
                <span className="text-gray-600">Heavy traffic</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-1 bg-yellow-500 rounded"></div>
                <span className="text-gray-600">Moderate traffic</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-1 bg-green-500 rounded"></div>
                <span className="text-gray-600">Light traffic</span>
              </div>
            </div>
          </div> */}

          {/* Simulated Map Display */}
          {/* Real Map Display */}
          <div className="h-full">
            <MapContainer
              center={defaultCenter}
              zoom={12}
              style={{ height: "100%", width: "100%", zIndex: 0 }}
              data-aos="fade-up"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                data-aos="fade-up"
              />

              {(matchedRoute ? [matchedRoute] : []).map((route) => (
                <Polyline
                  key={route.id}
                  positions={route.stops.map((s) => [s.latitude, s.longitude])}
                  color={route.color}
                  data-aos="fade-up"
                />
              ))}

              {(matchedRoute ? matchedRoute.stops : []).map((stop, i) => (
                <Marker
                  key={i}
                  position={[stop.latitude, stop.longitude]}
                  icon={L.icon({
                    iconUrl: "/images/location-pin.png",
                    iconSize: [40, 40],
                    iconAnchor: [12, 41],
                  })}
                  eventHandlers={{
                    click: (e) => {
                      const map = e.target._map;
                      if (map) {
                        map.flyTo([stop.latitude, stop.longitude], 17, { duration: 1 });
                      }
                    },
                  }}
                  data-aos="fade-up"
                >
                  <Popup offset={[7, -25]} data-aos="fade-up">
                    <strong>{stop.name}</strong>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InteractiveMapWebsite;
