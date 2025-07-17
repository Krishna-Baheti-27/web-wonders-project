// File: client/src/App.jsx
import { BrowserRouter , Route , Routes } from "react-router-dom";
import Home from "./pages/Home.jsx"
import LiveMap from "./pages/LiveMap.jsx";
import Contact from "./pages/Contact.jsx";
import MyTrips from "./pages/MyTrips.jsx";
import Parcel from "./pages/parcel.jsx";
import Signup from "./pages/users/Signup.jsx";
import Login from "./pages/users/login.jsx";
import Logout from "./pages/users/logout.jsx";
import {PrivateRoute, NotPrivateRoute} from "./components/PrivateRoute.jsx";
import Context from "./context/Context.jsx";


function App() {
  return(
    <div className="min-h-screen bg-lightgray">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Context><Home /></Context>} />
        <Route path="/live-map" element={<PrivateRoute><LiveMap /></PrivateRoute>} />
        <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
        <Route path="/my-trips" element={<PrivateRoute><MyTrips /></PrivateRoute>} />
        <Route path="/parcel" element={<PrivateRoute><Parcel /></PrivateRoute>} />
        <Route path="/user-logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
        <Route path="/user-login" element={<NotPrivateRoute><Login /></NotPrivateRoute>} />
        <Route path="/user-signup" element={<NotPrivateRoute><Signup /></NotPrivateRoute>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>      
    </BrowserRouter>
    </div>
  );  
}

export default App;
