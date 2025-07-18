import Aos from "aos";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const LiveMap = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "LiveMap";
  });

  const [routes, setRoutes] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [matchedRoute, setMatchedRoute] = useState(null);

  useEffect(() => {
    fetch("/data/routes.json")
      .then((res) => res.json())
      .then(setRoutes);
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

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Interactive Transit Map</h2>

        {/* Search Input */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="From stop"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="px-4 py-2 border rounded-md w-full md:w-1/3"
          />
          <input
            type="text"
            placeholder="To stop"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="px-4 py-2 border rounded-md w-full md:w-1/3"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Search Route
          </button>
        </div>

        {/* Map */}
        <MapContainer
          center={defaultCenter}
          zoom={15}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Show either matched route or all */}
          {(matchedRoute ? [matchedRoute] : routes).map((route) => (
            <Polyline
              key={route.id}
              positions={route.stops.map((s) => [s.lat, s.lng])}
              color={route.color}
            />
          ))}

          {(matchedRoute
            ? matchedRoute.stops
            : routes.flatMap((r) => r.stops)
          ).map((stop, i) => (
            <Marker
              key={i}
              position={[stop.lat, stop.lng]}
              icon={L.icon({
                iconUrl: "/images/location-pin.png",
                iconSize: [40, 40],
                iconAnchor: [12, 41],
              })}
              eventHandlers={{
                click: (e) => {
                  const map = e.target._map;
                  if (map) {
                    map.flyTo([stop.lat, stop.lng], 17, { duration: 1 });
                  }
                },
              }}
            >
              <Popup offset={[7, -25]}>
                <strong>{stop.name}</strong>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {matchedRoute ? (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
            Route Found: <strong>{matchedRoute.name}</strong>
          </div>
        ) : (
          from &&
          to && (
            <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded">
              No direct route found between <strong>{from}</strong> and{" "}
              <strong>{to}</strong>.
            </div>
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default LiveMap;
