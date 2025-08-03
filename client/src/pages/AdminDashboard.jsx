import React, { useState, useEffect } from "react";
import axios from "axios";

// API Endpoints
const ALERTS_API_URL = "http://localhost:4000/api/alerts";
const TRIPS_API_URL = "http://localhost:4000/api/trips";
const PARCELS_API_URL = "http://localhost:4000/api/parcels";
const ROUTES_API_URL = "http://localhost:4000/api/routes";

// --- Form for creating and editing alerts ---
const AlertForm = ({ onAlertSaved, editingAlert, setEditingAlert }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("Info");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingAlert) {
      setTitle(editingAlert.title);
      setMessage(editingAlert.message);
      setPriority(editingAlert.priority);
    } else {
      setTitle("");
      setMessage("");
      setPriority("Info");
    }
  }, [editingAlert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const alertData = { title, message, priority };

    try {
      if (editingAlert) {
        await axios.put(`${ALERTS_API_URL}/${editingAlert._id}`, alertData);
      } else {
        await axios.post(ALERTS_API_URL, alertData);
      }
      onAlertSaved();
      setEditingAlert(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save alert.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {editingAlert ? "Edit Alert" : "Create New Alert"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Alert Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <textarea
          placeholder="Alert Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows="3"
        ></textarea>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white"
        >
          <option value="Info">Info (Blue)</option>
          <option value="Warning">Warning (Yellow)</option>
          <option value="Critical">Critical (Red)</option>
        </select>
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {editingAlert ? "Save Changes" : "Create Alert"}
          </button>
          {editingAlert && (
            <button
              type="button"
              onClick={() => setEditingAlert(null)}
              className="w-full bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
};

// --- Form for creating and editing trips ---
const TripForm = ({ onTripSaved, editingTrip, setEditingTrip }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [features, setFeatures] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTrip) {
      setName(editingTrip.name);
      setDescription(editingTrip.description);
      setDuration(editingTrip.duration);
      setPrice(editingTrip.price);
      setImage(editingTrip.image);
      setFeatures(editingTrip.features.join(", "));
    } else {
      setName("");
      setDescription("");
      setDuration("");
      setPrice("");
      setImage("");
      setFeatures("");
    }
  }, [editingTrip]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const tripData = {
      name,
      description,
      duration,
      price,
      image,
      features: features.split(",").map((f) => f.trim()),
    };
    try {
      if (editingTrip) {
        await axios.put(`${TRIPS_API_URL}/${editingTrip._id}`, tripData);
      } else {
        await axios.post(TRIPS_API_URL, tripData);
      }
      onTripSaved();
      setEditingTrip(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save trip.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {editingTrip ? "Edit Trip" : "Create New Trip"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Trip Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows="2"
        ></textarea>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Features (comma-separated)"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            {editingTrip ? "Save Changes" : "Create Trip"}
          </button>
          {editingTrip && (
            <button
              type="button"
              onClick={() => setEditingTrip(null)}
              className="w-full bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
};

// --- Form for creating and editing routes ---
const RouteForm = ({ onRouteSaved, editingRoute, setEditingRoute }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("bus");
  const [color, setColor] = useState("#3B82F6");
  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("22:00");
  const [frequency, setFrequency] = useState(15);
  const [stops, setStops] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingRoute) {
      setId(editingRoute.id);
      setName(editingRoute.name);
      setType(editingRoute.type);
      setColor(editingRoute.color);
      setStartTime(editingRoute.startTime);
      setEndTime(editingRoute.endTime);
      setFrequency(editingRoute.frequency);
      setStops(JSON.stringify(editingRoute.stops, null, 2));
    } else {
      setId("");
      setName("");
      setType("bus");
      setColor("#3B82F6");
      setStartTime("06:00");
      setEndTime("22:00");
      setFrequency(15);
      setStops("");
    }
  }, [editingRoute]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const routeData = {
      id,
      name,
      type,
      color,
      startTime,
      endTime,
      frequency,
      stops,
    };
    try {
      if (editingRoute) {
        await axios.put(`${ROUTES_API_URL}/${editingRoute._id}`, routeData);
      } else {
        await axios.post(ROUTES_API_URL, routeData);
      }
      onRouteSaved();
      setEditingRoute(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save route.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {editingRoute ? "Edit Route" : "Create New Route"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Route ID (e.g., bus-101)"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Route Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <div className="grid grid-cols-2 gap-4">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white"
          >
            <option value="bus">Bus</option>{" "}
            <option value="metro">Metro</option>{" "}
            <option value="car">Car</option>{" "}
            <option value="cycle">Cycle</option>
          </select>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-12 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <textarea
          placeholder="Stops (Paste JSON Array here)"
          value={stops}
          onChange={(e) => setStops(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm"
          rows="5"
        ></textarea>
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {editingRoute ? "Save Changes" : "Create Route"}
          </button>
          {editingRoute && (
            <button
              type="button"
              onClick={() => setEditingRoute(null)}
              className="w-full bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
};

// --- Component to manage a single parcel ---
const ParcelManagerCard = ({ parcel, onUpdate }) => {
  /* ... existing code ... */
};

// --- Main Admin Dashboard Page ---
const AdminDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [editingAlert, setEditingAlert] = useState(null);
  const [trips, setTrips] = useState([]);
  const [editingTrip, setEditingTrip] = useState(null);
  const [parcels, setParcels] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [editingRoute, setEditingRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [alertsRes, tripsRes, parcelsRes, routesRes] = await Promise.all([
        axios.get(ALERTS_API_URL),
        axios.get(TRIPS_API_URL),
        axios.get(`${PARCELS_API_URL}/all`),
        axios.get(ROUTES_API_URL),
      ]);
      setAlerts(alertsRes.data);
      setTrips(tripsRes.data);
      setParcels(parcelsRes.data);
      setRoutes(routesRes.data);
    } catch (error) {
      console.error("Failed to fetch admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleToggleAlertStatus = async (alert) => {
    /* ... existing code ... */
  };
  const handleDeleteAlert = async (alertId) => {
    /* ... existing code ... */
  };
  const handleDeleteTrip = async (tripId) => {
    /* ... existing code ... */
  };
  const handleUpdateParcel = async (parcelId, updateData) => {
    /* ... existing code ... */
  };

  const handleDeleteRoute = async (routeId) => {
    if (
      window.confirm("Are you sure you want to permanently delete this route?")
    ) {
      try {
        await axios.delete(`${ROUTES_API_URL}/${routeId}`);
        fetchAllData();
      } catch (error) {
        console.error("Failed to delete route:", error);
      }
    }
  };

  const getPriorityColor = (priority) => {
    /* ... existing code ... */
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Column 1: Manage Routes */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Manage Routes
            </h2>
            <RouteForm
              onRouteSaved={fetchAllData}
              editingRoute={editingRoute}
              setEditingRoute={setEditingRoute}
            />
            <div className="space-y-4">
              {routes.map((route) => (
                <div
                  key={route._id}
                  className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
                >
                  <div>
                    <p
                      className="font-bold text-lg"
                      style={{ color: route.color }}
                    >
                      {route.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {route.stops.length} stops, every {route.frequency} mins
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setEditingRoute(route)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteRoute(route._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Manage Trips */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Manage Trips
            </h2>
            <TripForm
              onTripSaved={fetchAllData}
              editingTrip={editingTrip}
              setEditingTrip={setEditingTrip}
            />
            <div className="space-y-4">
              {trips.map((trip) => (
                <div
                  key={trip._id}
                  className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-lg">{trip.name}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setEditingTrip(trip)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTrip(trip._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Manage Alerts */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Manage Service Alerts
            </h2>
            <AlertForm
              onAlertSaved={fetchAllData}
              editingAlert={editingAlert}
              setEditingAlert={setEditingAlert}
            />
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert._id}
                  className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${getPriorityColor(
                    alert.priority
                  )}`}
                >
                  <p className="font-bold">
                    {alert.title}{" "}
                    <span
                      className={`text-xs font-semibold ml-2 px-2 py-0.5 rounded-full ${
                        alert.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {alert.status}
                    </span>
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleToggleAlertStatus(alert)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded-lg text-xs"
                    >
                      Toggle Status
                    </button>
                    <button
                      onClick={() => setEditingAlert(alert)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded-lg text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAlert(alert._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Full-width Parcel Management Section --- */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Manage Parcel Orders
          </h2>
          {loading ? (
            <p>Loading parcel orders...</p>
          ) : parcels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parcels.map((parcel) => (
                <ParcelManagerCard
                  key={parcel._id}
                  parcel={parcel}
                  onUpdate={handleUpdateParcel}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500">
                No pending parcel orders to manage.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
