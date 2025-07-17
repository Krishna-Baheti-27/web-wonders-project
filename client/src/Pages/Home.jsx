import Navbar from "../components/Navbar.jsx";
import { useEffect } from "react";

function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Home";

        // Initialize AOS
        AOS.init();
    })
    return (
        <>
            <Navbar />
            <div className="home m-auto min-w-screen flex flex-col items-center justify-center bg-gray-100 p-8" data-aos = "fade-up" data-aos-duration="500">
                <h1 className="font-inter text-4xl font-bold text-gray-800 mb-4"data-aos = "fade-up" data-aos-duration="1000">Welcome to the Home Page</h1>
                <p className="font-inter text-lg text-gray-600" data-aos = "fade-up" data-aos-duration="1500">This is the home page of our web application.</p>
                <div className="livemap min-w-screen min-h-screen grid grid-cols-2 grid-rows-2 gap-9 p-4 box-border rounded-lg shadow-lg mt-8"data-aos = "fade-up" data-aos-duration="2000">
                    {/* this is map preview */}
                    <div className="map-preview w-fit grid grid-rows-2 bg-gray-200 rounded-3xl shadow-lg flex items-center justify-center"data-aos = "fade-up" data-aos-duration="2500">
                        {/* Placeholder for the map component */}
                        <h2 className="text-2xl font-bold p-4">Map Preview</h2>
                    </div>
                    {/* and this is My trip info */}
                    <div className="my-trip-info w-fit grid grid-rows-2 bg-gray-200 rounded-3xl shadow-lg flex items-center justify-center"data-aos = "fade-up" data-aos-duration="2500">
                        {/* Placeholder for the map component */}
                        <h2 className="text-2xl font-bold p-4">My Trip Info</h2>
                    </div>
                    {/* and This is Parcel */}
                    <div className="parcel-info w-fit grid grid-rows-2 bg-gray-200 rounded-3xl shadow-lg flex items-center justify-center"data-aos = "fade-up" data-aos-duration="3000">
                        {/* Placeholder for the map component */}
                        <h2 className="text-2xl font-bold p-4">Parcel</h2>
                    </div>
                    {/* and this is contact */}
                    <div className="contact w-fit grid grid-rows-2 bg-gray-200 rounded-3xl shadow-lg flex items-center justify-center"data-aos = "fade-up" data-aos-duration="3000">
                        {/* Placeholder for the map component */}
                        <h2 className="text-2xl font-bold p-4">Contact</h2>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Home;