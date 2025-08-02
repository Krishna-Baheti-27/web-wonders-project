import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = "http://localhost:4000/api/alerts";

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
        // Update existing alert
        await axios.put(`${API_URL}/${editingAlert._id}`, alertData);
      } else {
        // Create new alert
        await axios.post(API_URL, alertData);
      }
      onAlertSaved(); // Refresh the list
      setEditingAlert(null); // Clear the form
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save alert.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editingAlert ? "Edit Alert" : "Create New Alert"}
      </h2>
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

// --- Main Admin Dashboard Page ---
const AdminDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAlert, setEditingAlert] = useState(null);

  const fetchAllAlerts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setAlerts(response.data);
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAlerts();
  }, []);

  const handleToggleStatus = async (alert) => {
    const newStatus = alert.status === "active" ? "inactive" : "active";
    try {
      await axios.patch(`${API_URL}/${alert._id}/status`, {
        status: newStatus,
      });
      fetchAllAlerts(); // Refresh list
    } catch (error) {
      console.error("Failed to toggle alert status:", error);
    }
  };

  const handleDelete = async (alertId) => {
    if (
      window.confirm("Are you sure you want to permanently delete this alert?")
    ) {
      try {
        await axios.delete(`${API_URL}/${alertId}`);
        fetchAllAlerts(); // Refresh list
      } catch (error) {
        console.error("Failed to delete alert:", error);
      }
    }
  };

  const getPriorityColor = (priority) => {
    if (priority === "Critical") return "border-red-500";
    if (priority === "Warning") return "border-yellow-500";
    return "border-blue-500";
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-10">
            Admin Dashboard: Service Alerts
          </h1>

          <AlertForm
            onAlertSaved={fetchAllAlerts}
            editingAlert={editingAlert}
            setEditingAlert={setEditingAlert}
          />

          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 pb-2">
            Existing Alerts
          </h2>
          {loading ? (
            <p>Loading alerts...</p>
          ) : (
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
                    <p className="text-xs text-gray-400 mt-1">
                      Last Updated: {new Date(alert.updatedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleToggleStatus(alert)}
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
                      onClick={() => handleDelete(alert._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
