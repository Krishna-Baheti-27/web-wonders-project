import React, { useState, useEffect } from 'react';
import { 
  Navigation, 
  MapPin, 
  Car, 
  Bike, 
  Bus, 
  User, 
  Search, 
  Route, 
  Clock, 
  Ruler, 
  Star, 
  Settings, 
  Menu, 
  X, 
  Heart,
  Zap,
  AlertTriangle,
  Layers,
  Plus,
  Minus,
  RotateCcw,
  Share
} from 'lucide-react';
import Navbar from '../components/Navbar';

const InteractiveMapWebsite = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [transportMode, setTransportMode] = useState('car');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showTraffic, setShowTraffic] = useState(true);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [savedRoutes, setSavedRoutes] = useState([
    { id: 1, name: 'Home to Work', from: 'Home', to: 'Office Downtown' },
    { id: 2, name: 'Airport Route', from: 'Downtown', to: 'City Airport' }
  ]);
  const [routeInfo, setRouteInfo] = useState({
    distance: '12.5 km',
    duration: '18 min',
    traffic: 'Light traffic'
  });

  const transportModes = [
    { id: 'car', name: 'Car', icon: Car, color: 'bg-blue-500' },
    { id: 'bike', name: 'Bike', icon: Bike, color: 'bg-green-500' },
    { id: 'transit', name: 'Transit', icon: Bus, color: 'bg-orange-500' },
    { id: 'walking', name: 'Walking', icon: User, color: 'bg-purple-500' }
  ];

  const alternativeRoutes = [
    { id: 1, name: 'Fastest Route', time: '18 min', distance: '12.5 km', traffic: 'light' },
    { id: 2, name: 'Avoid Highways', time: '22 min', distance: '11.8 km', traffic: 'moderate' },
    { id: 3, name: 'Scenic Route', time: '25 min', distance: '14.2 km', traffic: 'light' }
  ];

  const calculateRoute = () => {
    if (fromLocation && toLocation) {
      // Simulate route calculation
      const routes = {
        car: { distance: '12.5 km', duration: '18 min', traffic: 'Light traffic' },
        bike: { distance: '11.2 km', duration: '35 min', traffic: 'N/A' },
        transit: { distance: '13.8 km', duration: '28 min', traffic: 'On time' },
        walking: { distance: '10.8 km', duration: '2h 15min', traffic: 'N/A' }
      };
      setRouteInfo(routes[transportMode]);
    }
  };

  const saveCurrentRoute = () => {
    if (fromLocation && toLocation) {
      const newRoute = {
        id: savedRoutes.length + 1,
        name: `${fromLocation} to ${toLocation}`,
        from: fromLocation,
        to: toLocation
      };
      setSavedRoutes([...savedRoutes, newRoute]);
    }
  };

  useEffect(() => {
    calculateRoute();
  }, [fromLocation, toLocation, transportMode]);

  return (
    <>
    <Navbar/>
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-96' : 'w-0'} transition-all duration-300 bg-white shadow-xl z-30 overflow-hidden`}>
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
            {/* Search Bar */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search places..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Route Input */}
            <div className="p-4 space-y-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Plan Your Route</h2>
              
              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute left-3 top-3 w-3 h-3 bg-green-500 rounded-full"></div>
                  <input
                    type="text"
                    placeholder="From"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute left-3 top-3 w-3 h-3 bg-red-500 rounded-full"></div>
                  <input
                    type="text"
                    placeholder="To"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Transport Mode Selection */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {transportModes.map((mode) => {
                  const IconComponent = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setTransportMode(mode.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        transportMode === mode.id
                          ? `${mode.color} text-white border-transparent`
                          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <IconComponent className="h-6 w-6 mx-auto" />
                      <span className="text-xs mt-1 block">{mode.name}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={calculateRoute}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Route className="h-5 w-5" />
                <span>Get Directions</span>
              </button>
            </div>

            {/* Route Information */}
            {(fromLocation && toLocation) && (
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Route Details</h3>
                <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-600">Duration:</span>
                    </div>
                    <span className="font-semibold text-blue-600">{routeInfo.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Ruler className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-600">Distance:</span>
                    </div>
                    <span className="font-semibold">{routeInfo.distance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-600">Traffic:</span>
                    </div>
                    <span className="font-semibold text-green-600">{routeInfo.traffic}</span>
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
            )}

            {/* Alternative Routes */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800">Alternative Routes</h3>
                <button
                  onClick={() => setShowAlternatives(!showAlternatives)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  {showAlternatives ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showAlternatives && (
                <div className="space-y-2">
                  {alternativeRoutes.map((route) => (
                    <div key={route.id} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 cursor-pointer transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800">{route.name}</h4>
                          <p className="text-sm text-gray-600">{route.distance} • {route.time}</p>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          route.traffic === 'light' ? 'bg-green-400' : 
                          route.traffic === 'moderate' ? 'bg-yellow-400' : 'bg-red-400'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Saved Routes */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Saved Routes</h3>
              <div className="space-y-2">
                {savedRoutes.map((route) => (
                  <div key={route.id} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">{route.name}</h4>
                        <p className="text-sm text-gray-600">{route.from} → {route.to}</p>
                      </div>
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
        <div className="absolute top-4 right-4 z-20 space-y-2">
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
        </div>

        {/* Map Layer Controls */}
        <div className="absolute bottom-4 right-4 z-20">
          <div className="bg-white rounded-lg shadow-lg p-3 space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="traffic"
                checked={showTraffic}
                onChange={(e) => setShowTraffic(e.target.checked)}
                className="rounded text-blue-600"
              />
              <label htmlFor="traffic" className="text-sm text-gray-700">Traffic</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="satellite"
                className="rounded text-blue-600"
              />
              <label htmlFor="satellite" className="text-sm text-gray-700">Satellite</label>
            </div>
          </div>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 z-20 bg-white rounded-lg shadow-lg p-4 max-w-xs">
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
        </div>

        {/* Simulated Map Display */}
        <div className="h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center relative">
          {/* Simulated map with route */}
          <div className="absolute inset-0 bg-blue-50">
            {/* Grid pattern to simulate map */}
            <div className="absolute inset-0 opacity-10"
                 style={{
                   backgroundImage: `
                     linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
                   `,
                   backgroundSize: '50px 50px'
                 }}>
            </div>
            
            {/* Simulated route line */}
            {fromLocation && toLocation && (
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2">
                <svg className="w-full h-full">
                  <path
                    d="M 0 80 Q 100 20 200 60 T 400 80"
                    stroke="#3B82F6"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Start marker */}
                  <circle cx="0" cy="80" r="8" fill="#10B981" />
                  {/* End marker */}
                  <circle cx="400" cy="80" r="8" fill="#EF4444" />
                </svg>
              </div>
            )}
          </div>
          
          <div className="text-center z-10">
            <Navigation className="h-16 w-16 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 mb-2">Interactive Map View</h2>
            <p className="text-gray-500 max-w-md">
              {fromLocation && toLocation 
                ? `Showing route from ${fromLocation} to ${toLocation}`
                : 'Enter your starting point and destination to see the route'}
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default InteractiveMapWebsite;