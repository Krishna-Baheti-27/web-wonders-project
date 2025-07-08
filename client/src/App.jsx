// File: client/src/App.jsx
import React, { useState } from "react";
import {
  LoadScript,
  GoogleMap,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 21.2363961,
  lng: 75.2906071,
};

function App() {
  const [map, setMap] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState(null);
  const [fareInfo, setFareInfo] = useState(null);

  const handleRoute = async () => {
    const res = await axios.post("http://localhost:5000/api/getRoute", {
      origin,
      destination,
    });
    setDirections(res.data.directions);
    setFareInfo({
      distance: res.data.distance,
      duration: res.data.duration,
      fare: res.data.fare,
    });
  };

  const handleSave = async () => {
    await axios.post("http://localhost:5000/api/saveRoute", {
      origin,
      destination,
      ...fareInfo,
      userId: "demo-user",
    });
    alert("Route saved!");
  };

  return (
    <LoadScript
      googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
      libraries={["places"]}
    >
      <div className="flex">
        <div className="w-1/3 p-4">
          <h2 className="text-xl font-bold mb-2">Transit Fare Estimator</h2>
          <Autocomplete>
            <input
              className="border p-2 w-full mb-2"
              placeholder="Enter source"
              onChange={(e) => setOrigin(e.target.value)}
            />
          </Autocomplete>
          <Autocomplete>
            <input
              className="border p-2 w-full mb-2"
              placeholder="Enter destination"
              onChange={(e) => setDestination(e.target.value)}
            />
          </Autocomplete>
          <button
            onClick={handleRoute}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Get Route
          </button>
          {fareInfo && (
            <div className="mt-4 text-sm">
              <p>
                <strong>Distance:</strong> {fareInfo.distance}
              </p>
              <p>
                <strong>Duration:</strong> {fareInfo.duration}
              </p>
              <p>
                <strong>Fare:</strong> {fareInfo.fare}
              </p>
              <button
                onClick={handleSave}
                className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
              >
                Save Route
              </button>
            </div>
          )}
        </div>
        <div className="w-2/3">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={(map) => setMap(map)}
          >
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>
      </div>
    </LoadScript>
  );
}

export default App;
