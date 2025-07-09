// File: client/src/App.jsx
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx"
import Offer from "./pages/Offer.jsx";
import Business from "./pages/Business.jsx";
import MyTrips from "./pages/MyTrips.jsx";
import Login from "./Components/LoginSignup/Login.jsx";
import SignUp from "./Components/LoginSignup/Signup.jsx";


function App() {
  return(
    <div className="min-h-screen bg-[#F7F9FC]">
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login/> } />
        <Route path="/signup" element={<SignUp/> } />
        <Route path="/offer" element={<Offer/>} />
        <Route path="/business" element={<Business/>} />
        <Route path="/mytrips" element={<MyTrips/>} />
      </Routes>      
    </Router>
    </div>
  );  
}

export default App;
