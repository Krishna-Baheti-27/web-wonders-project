import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useEffect } from "react";
const Parcel = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Parcel";
    })
    return ( 
        <>
        <Navbar />
        <h1>parcel</h1>
        <Footer />
        </>
    );
}
 
export default Parcel;