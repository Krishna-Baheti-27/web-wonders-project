import Navbar from "../components/Navbar";
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
        </>
    );
}
 
export default Parcel;