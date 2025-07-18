import Aos from "aos";
import { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
const LiveMap = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "LiveMap";
    })
    return (
        <>
        <Navbar />
            <div className="map-container flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6" data-aos="fade-up">Live Map</h2>
            <div className="map-placeholder w-full max-w-4xl h-96 bg-gray-300 rounded-lg shadow-lg flex items-center justify-center text-gray-600 text-xl" data-aos="fade-up">
                {/* This is where your actual map component would go */}
                Map will be displayed here
            </div>
            <p className="mt-8 text-lg text-gray-700" data-aos="fade-up">
                Track your shipments and vehicles in real-time.
            </p>
        </div>
        <Footer />
        </>
    );
}
 
export default LiveMap;