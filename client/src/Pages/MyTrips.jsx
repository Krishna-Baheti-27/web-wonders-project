import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useEffect } from "react";
const MyTrips = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "MyTrips";
    })
    return ( 
        <>
        <Navbar />
        <h1>MyTrips</h1>
        <Footer />
        </>
     );
}
 
export default MyTrips;