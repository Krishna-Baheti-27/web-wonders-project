import Navbar from "../components/Navbar";
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
        </>
     );
}
 
export default MyTrips;