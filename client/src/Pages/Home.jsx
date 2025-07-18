import { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Home";
    })
    return (
        <>
            <Navbar />
            <div className="home m-auto min-w-screen flex flex-col items-center justify-center bg-gray-100 p-8" data-aos="fade-up">
                <h1 className="font-inter text-4xl font-bold text-gray-800 mb-4" data-aos="fade-up">Welcome to the Home Page</h1>
                <p className="font-inter text-lg text-gray-600" data-aos="fade-up">This is the home page of our web application.</p>
                <div className="livemap min-w-screen min-h-screen grid grid-cols-2 grid-rows-2 gap-9 p-4 box-border rounded-lg shadow-lg mt-8" data-aos="fade-up">
                    {/* this is map preview */}
                    <div className="map-preview w-fit grid grid-rows-2 bg-gray-200 rounded-3xl shadow-lg flex items-center justify-center" data-aos="fade-up">
                        {/* Placeholder for the map component */}
                        <h2 className="text-2xl font-bold p-4">Map Preview</h2>
                    </div>
                    {/* and this is My trip info */}
                    <div className="my-trip-info w-fit grid grid-rows-2 bg-gray-200 rounded-3xl shadow-lg flex items-center justify-center" data-aos="fade-up">
                        {/* Placeholder for the map component */}
                        <h2 className="text-2xl font-bold p-4">My Trip Info</h2>
                    </div>
                    {/* and This is Parcel */}
                    <div className="parcel-info w-fit grid grid-rows-2 bg-gray-200 rounded-3xl shadow-lg flex items-center justify-center" data-aos="fade-up">
                        {/* Placeholder for the map component */}
                        <h2 className="text-2xl font-bold p-4">Parcel</h2>
                    </div>
                    {/* and this is contact */}
                    <div className="contact w-fit grid grid-rows-2 bg-gray-200 rounded-3xl shadow-lg flex items-center justify-center" data-aos="fade-up">
                        {/* Placeholder for the map component */}
                        <h2 className="text-2xl font-bold p-4">Contact</h2>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;