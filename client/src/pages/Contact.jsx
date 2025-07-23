import Navbar from "../components/Navbar";
import {useEffect} from "react";

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Contact";
    })
    return ( 
        <>
        <Navbar />
        <h1>Contact</h1>
        </>
     );
}
 
export default Contact;