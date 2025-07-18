import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className="bg-darkgray text-white px-6 py-8 shadow-sm flex flex-col md:flex-row items-center justify-between" id = "footer">
            <div className="mb-4 md:mb-0">
                <Link to="/" className='text-3xl font-bold text-royalblue hover:text-cyan transition'>
                    Apni site</Link>
                <p className="text-sm text-gray-400 mt-2">&copy; 2023 Apni site. All rights reserved.</p>
            </div>
            {/* <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-lg font-sans text-gray-300">
                {/* <Link to="/" className='hover:text-cyan transition'>Home</Link> */}
                {/* <Link to="/live-map" className='hover:text-cyan transition'>Live Map</Link> */}
                {/* <Link to="/my-trips" className='hover:text-cyan transition'>My Trips</Link>
                <Link to="/parcel" className='hover:text-cyan transition'>Send a Parcel</Link> */}
                {/* <Link to="/contact" className='hover:text-cyan transition'>Contact</Link> */}
            {/* </div>*/} 
            <div className="flex space-x-4 mt-4 md:mt-0">
                {/* Social media icons can go here */}
                <a href="#" className="text-gray-300 hover:text-cyan transition">
                    <i className="fab fa-facebook-f">facebook</i>
                </a>
                <a href="#" className="text-gray-300 hover:text-cyan transition">
                    <i className="fab fa-twitter">twitter</i>
                </a>
                <a href="#" className="text-gray-300 hover:text-cyan transition">
                    <i className="fab fa-instagram">insta</i>
                </a>
            </div>
        </footer>
    );
}

export default Footer;
