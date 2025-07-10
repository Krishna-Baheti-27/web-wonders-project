// File: client/src/App.jsx
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx"
import LiveMap from "./Pages/LiveMap.jsx";
import Contact from "./Pages/Contact.jsx";
import MyTrips from "./pages/MyTrips.jsx";
import Parcel from "./Pages/parcel.jsx";
import LoginRegister from "./components/LoginSignup/LoginSignup.jsx";



function App() {
  return(
    <div className="min-h-screen bg-lightgray">
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/LoginRegister" element={<LoginRegister/> } />
        <Route path="/live-map" element={<LiveMap/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/my-trips" element={<MyTrips/>} />
        <Route path="/parcel" element={<Parcel/>} />
      </Routes>      
    </Router>
    </div>
  );  
}

export default App;
