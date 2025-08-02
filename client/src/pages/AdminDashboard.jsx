import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
// Note: Navbar and Footer are removed as they are now in App.jsx

const ALERTS_API_URL = "http://localhost:4000/api/alerts";
const TRIPS_API_URL = "http://localhost:4000/api/trips";

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
    <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
      <Navbar/>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
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
            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {editingAlert ? "Save Changes" : "Create Alert"}
          </button>
          {editingAlert && (
            <button
              type="button"
              onClick={() => setEditingAlert(null)}
              className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel Edit
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
    <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        {editingTrip ? "Edit Trip" : "Create New Trip"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Trip Name (e.g., City Explorer)"
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
          rows="3"
        ></textarea>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Duration (e.g., 8 hours)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Price (e.g., $149)"
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
        <textarea
          placeholder="Features (comma-separated, e.g., Guide, Lunch, Photos)"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows="2"
        ></textarea>
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
          >
            {editingTrip ? "Save Changes" : "Create Trip"}
          </button>
          {editingTrip && (
            <button
              type="button"
              onClick={() => setEditingTrip(null)}
              className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel Edit
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
};

// --- Main Admin Dashboard Page ---
const AdminDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [editingAlert, setEditingAlert] = useState(null);
  const [trips, setTrips] = useState([]);
  const [editingTrip, setEditingTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [alertsRes, tripsRes] = await Promise.all([
        axios.get(ALERTS_API_URL),
        axios.get(TRIPS_API_URL),
      ]);
      setAlerts(alertsRes.data);
      setTrips(tripsRes.data);
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
    const newStatus = alert.status === "active" ? "inactive" : "active";
    try {
      await axios.patch(`${ALERTS_API_URL}/${alert._id}/status`, {
        status: newStatus,
      });
      fetchAllData();
    } catch (error) {
      console.error("Failed to toggle alert status:", error);
    }
  };

  const handleDeleteAlert = async (alertId) => {
    if (
      window.confirm("Are you sure you want to permanently delete this alert?")
    ) {
      try {
        await axios.delete(`${ALERTS_API_URL}/${alertId}`);
        fetchAllData();
      } catch (error) {
        console.error("Failed to delete alert:", error);
      }
    }
  };

  const handleDeleteTrip = async (tripId) => {
    if (
      window.confirm("Are you sure you want to permanently delete this trip?")
    ) {
      try {
        await axios.delete(`${TRIPS_API_URL}/${tripId}`);
        fetchAllData();
      } catch (error) {
        console.error("Failed to delete trip:", error);
      }
    }
  };

  const getPriorityColor = (priority) => {
    if (priority === "Critical") return "border-red-500";
    if (priority === "Warning") return "border-yellow-500";
    return "border-blue-500";
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Column 1: Trips Management */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
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
                    <p className="text-gray-600 text-sm">{trip.description}</p>
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

          {/* Column 2: Alerts Management */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
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
                  className={`bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row items-start md:items-center justify-between border-l-4 ${getPriorityColor(
                    alert.priority
                  )}`}
                >
                  <div className="flex-1 mb-4 md:mb-0">
                    <p className="font-bold text-lg">
                      {alert.title}{" "}
                      <span
                        className={`text-sm font-semibold ml-2 px-2 py-0.5 rounded-full ${
                          alert.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {alert.status}
                      </span>
                    </p>
                    <p className="text-gray-600">{alert.message}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleToggleAlertStatus(alert)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg text-sm"
                    >
                      Toggle Status
                    </button>
                    <button
                      onClick={() => setEditingAlert(alert)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAlert(alert._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
