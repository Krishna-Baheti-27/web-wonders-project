// File: client/src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LiveMap from "./pages/LiveMap.jsx";
import Contact from "./pages/Contact.jsx";
import MyTrips from "./pages/MyTrips.jsx";
import Parcel from "./pages/Parcel.jsx";
import Orders from "./pages/Orders.jsx";
import Signup from "./pages/users/Signup.jsx";
import Login from "./pages/users/Login.jsx";
import Logout from "./pages/users/Logout.jsx";
import { PrivateRoute, NotPrivateRoute } from "./components/PrivateRoute.jsx";
import Context from "./context/Context.jsx";
import AOS from "aos";
import { useEffect } from "react";
import Schedules from "./pages/Schedules.jsx";

function App() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 500, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once
    });
  }, []);
  return (
    <div className="min-h-screen bg-lightgray">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Context>
                <Home />
              </Context>
            }
          />
          <Route
            path="/live-map"
            element={
              <PrivateRoute>
                <LiveMap />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedules"
            element={
              <PrivateRoute>
                <Schedules />
              </PrivateRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <Contact />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-trips"
            element={
              <PrivateRoute>
                <MyTrips />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="/parcel"
            element={
              <PrivateRoute>
                <Parcel />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-logout"
            element={
              <PrivateRoute>
                <Logout />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-login"
            element={
              <NotPrivateRoute>
                <Login />
              </NotPrivateRoute>
            }
          />
          <Route
            path="/user-signup"
            element={
              <NotPrivateRoute>
                <Signup />
              </NotPrivateRoute>
            }
          />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
