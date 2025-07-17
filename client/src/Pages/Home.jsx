import Navbar from "../components/Navbar.jsx";
import { curr_user } from "../utils/api.js";


function Home() {
    return (
        <>
        <Navbar />
        <div className="home">
            <h1 className="font-inter">Welcome {curr_user.name} to the Home Page</h1>
            <p className="font-roboto">This is the home page of our web application.</p>
        </div>
        </>
    );
}

export default Home;