import React, { useState, useContext } from 'react';
import { Play, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import { DataContext } from "../context/Context.jsx";
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';


const LogisticsWebsite = () => {
    const data = useContext(DataContext);
    let isAuthenticated = false;
    if (data.user._id) isAuthenticated = true;

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
    
      {/* Hero Section - Exact match with isometric illustration */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-6xl font-bold text-black leading-tight mb-6">
                Full Sustainable<br/>
                Cargo Solution
              </h1>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We Continue To Pursue That Same Vision In Today's Complex,<br/>
                Uncertain World, Working Every Day To Earn Our Customers'
              </p>
              <div className="flex items-center gap-6">
                { isAuthenticated ?  <Link to="/live-map" className="bg-white border-2 border-gray-900 text-black px-8 py-3 font-medium">Live Map</Link>
 :                 <button className="bg-white border-2 border-gray-900 text-black px-8 py-3 font-medium">Get Started</button>
 }
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Play className="w-4 h-4 text-gray-600 ml-1" />
                  </div>
                  <span className="text-gray-600">Watch more</span>
                </div>
              </div>
            </div>
            
            {/* Isometric warehouse illustration - exact match */}
            <div className="relative">
              <div className="relative h-96">
                {/* Blue truck on left */}
                <div className="absolute left-0 top-32 w-24 h-16 bg-blue-500 rounded-sm transform -rotate-12"></div>
                <div className="absolute left-0 top-40 w-6 h-6 bg-gray-800 rounded-full"></div>
                <div className="absolute left-16 top-40 w-6 h-6 bg-gray-800 rounded-full"></div>
                
                {/* Yellow forklift */}
                <div className="absolute left-32 top-24 w-16 h-12 bg-yellow-400 rounded-sm"></div>
                <div className="absolute left-36 top-20 w-8 h-8 bg-yellow-500 rounded-sm"></div>
                
                {/* Worker figure */}
                <div className="absolute left-44 top-36 w-8 h-12 bg-blue-600 rounded-sm"></div>
                <div className="absolute left-46 top-32 w-4 h-4 bg-yellow-200 rounded-full"></div>
                
                {/* Gray equipment */}
                <div className="absolute left-64 top-28 w-12 h-10 bg-gray-400 rounded-sm"></div>
                
                {/* Large truck with blue container */}
                <div className="absolute left-8 bottom-16 w-32 h-20 bg-blue-500 rounded-sm transform rotate-12"></div>
                <div className="absolute left-4 bottom-8 w-8 h-8 bg-gray-800 rounded-full"></div>
                <div className="absolute left-32 bottom-8 w-8 h-8 bg-gray-800 rounded-full"></div>
                
                {/* Warehouse building on right */}
                <div className="absolute right-0 top-8 w-48 h-32 bg-gray-200 rounded-sm border-4 border-gray-300"></div>
                <div className="absolute right-2 top-16 w-44 h-16 bg-blue-100 rounded-sm"></div>
                
                {/* Blue boxes in warehouse */}
                <div className="absolute right-8 top-20 w-8 h-6 bg-blue-500 rounded-sm"></div>
                <div className="absolute right-16 top-20 w-8 h-6 bg-blue-500 rounded-sm"></div>
                
                {/* Yellow boxes bottom */}
                <div className="absolute right-12 bottom-20 w-12 h-8 bg-yellow-400 rounded-sm"></div>
                <div className="absolute right-12 bottom-12 w-12 h-8 bg-yellow-400 rounded-sm"></div>
                
                {/* Warehouse door */}
                <div className="absolute right-4 bottom-8 w-40 h-16 bg-gray-700 rounded-sm"></div>
                
                {/* Equipment on right */}
                <div className="absolute right-32 bottom-4 w-10 h-8 bg-gray-400 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client logos - exact positioning */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center opacity-40">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
              <span className="text-lg font-medium">umbrella</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-400 rounded-sm"></div>
              <span className="text-lg font-medium">Product.</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-400"></div>
              <span className="text-lg font-medium">Colab</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
              <span className="text-lg font-medium">Leafe</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
              <span className="text-lg font-medium">umbrella</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-400"></div>
              <span className="text-lg font-medium">Greenish</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blue video section - exact match */}
      <section className="bg-blue-400 py-16 relative">
        <div className="absolute top-4 right-4">
          <button className="w-12 h-12 bg-black rounded-full text-white text-xs">
            Get a Quote
          </button>
        </div>
        
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-8">
              We Provide Safe And<br/>
              Reliable Cargo Solutions
            </h2>
            <div className="flex justify-center">
              <button className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                <Play className="w-8 h-8 text-white ml-2" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            {/* Road Transportation */}
            <div className="bg-white bg-opacity-20 rounded-lg p-6 relative">
              <div className="absolute top-2 left-2">
                <Play className="w-4 h-4 text-white" />
              </div>
              <div className="absolute top-2 left-2 text-white text-xs">0:05 / 1:29</div>
              
              <div className="mt-8 mb-4">
                {/* Truck illustration */}
                <div className="w-16 h-10 bg-blue-600 rounded-sm mx-auto mb-2"></div>
                <div className="flex justify-center gap-1">
                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                </div>
                {/* Yellow boxes */}
                <div className="flex justify-center gap-1 mt-2">
                  <div className="w-4 h-3 bg-yellow-400 rounded-sm"></div>
                  <div className="w-4 h-3 bg-yellow-400 rounded-sm"></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-white font-medium text-sm">Road</div>
                <div className="text-white font-medium text-sm">Transportation</div>
                <button className="w-6 h-6 bg-white bg-opacity-30 rounded-full mt-2 mx-auto flex items-center justify-center">
                  <span className="text-white text-xs">→</span>
                </button>
              </div>
            </div>

            {/* Ocean Freight */}
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <div className="mt-8 mb-4">
                {/* Ship illustration */}
                <div className="w-16 h-8 bg-blue-600 rounded-sm mx-auto mb-2 relative">
                  <div className="absolute top-0 left-4 w-8 h-6 bg-yellow-400 rounded-sm"></div>
                </div>
                <div className="w-12 h-2 bg-blue-800 rounded-sm mx-auto"></div>
              </div>
              
              <div className="text-center">
                <div className="text-white font-medium text-sm">Ocean</div>
                <div className="text-white font-medium text-sm">Freight</div>
                <button className="w-6 h-6 bg-white bg-opacity-30 rounded-full mt-2 mx-auto flex items-center justify-center">
                  <span className="text-white text-xs">→</span>
                </button>
              </div>
            </div>

            {/* Air Freight */}
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <div className="mt-8 mb-4">
                {/* Plane illustration */}
                <div className="w-16 h-6 bg-blue-600 rounded-full mx-auto mb-2 relative">
                  <div className="absolute -top-1 left-6 w-4 h-8 bg-blue-600 rounded-sm"></div>
                  <div className="absolute bottom-0 left-2 w-3 h-3 bg-yellow-400 rounded-sm"></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-white font-medium text-sm">Air</div>
                <div className="text-white font-medium text-sm">Freight</div>
                <button className="w-6 h-6 bg-white bg-opacity-30 rounded-full mt-2 mx-auto flex items-center justify-center">
                  <span className="text-white text-xs">→</span>
                </button>
              </div>
            </div>

            {/* Drone Delivery */}
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <div className="mt-8 mb-4">
                {/* Drone illustration */}
                <div className="relative mx-auto w-12 h-8">
                  <div className="w-8 h-4 bg-gray-300 rounded-sm mx-auto"></div>
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-gray-300 rounded-full"></div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gray-300 rounded-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gray-300 rounded-full"></div>
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-gray-300 rounded-full"></div>
                  <div className="absolute -bottom-4 left-2 w-4 h-3 bg-yellow-400 rounded-sm"></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-white font-medium text-sm">Drone</div>
                <div className="text-white font-medium text-sm">Parcel Delivery</div>
                <button className="w-6 h-6 bg-white bg-opacity-30 rounded-full mt-2 mx-auto flex items-center justify-center">
                  <span className="text-white text-xs">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safe Reliable Logistic Solutions - exact match */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-black mb-12 leading-tight">
                Safe Reliable<br/>
                Logistic Solutions
              </h2>
              
              {/* Large truck illustration */}
              <div className="relative">
                <div className="w-80 h-32 bg-blue-500 rounded-lg relative">
                  <div className="absolute left-4 top-4 w-48 h-20 bg-blue-400 rounded border-4 border-white"></div>
                  <div className="absolute right-4 top-2 w-24 h-24 bg-gray-200 rounded"></div>
                </div>
                
                {/* Truck wheels */}
                <div className="absolute -bottom-4 left-8 w-8 h-8 bg-gray-800 rounded-full"></div>
                <div className="absolute -bottom-4 left-20 w-8 h-8 bg-gray-800 rounded-full"></div>
                <div className="absolute -bottom-4 right-12 w-8 h-8 bg-gray-800 rounded-full"></div>
                
                {/* Worker and boxes */}
                <div className="absolute -left-8 -bottom-8 w-8 h-12 bg-blue-600 rounded-sm"></div>
                <div className="absolute -left-6 -bottom-12 w-4 h-4 bg-yellow-200 rounded-full"></div>
                
                <div className="absolute -right-8 -bottom-8">
                  <div className="w-8 h-6 bg-yellow-400 rounded-sm mb-1"></div>
                  <div className="w-8 h-6 bg-yellow-400 rounded-sm"></div>
                </div>
              </div>

              
            </div>
            
            <div>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Road Transportation Has A Crucial Role.<br/>
                Coordinated Transportation In The<br/>
                Countries Of Origin Destination Makes<br/>
                All The Difference.
              </p>
              <button className="bg-white border-2 border-black text-black px-8 py-3 font-medium flex items-center gap-2">
                Learn More
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blue testimonial section - exact match */}
      <section className="bg-blue-400 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <button className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white ml-2" />
            </button>
          </div>
          
          <div className="bg-blue-400 p-8 rounded-lg mb-8">
            <div className="text-4xl text-gray-600 mb-4">"</div>
            <p className="text-black text-lg leading-relaxed mb-8">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit<br/>
              officia consequat duis enim velit mollit. Exercitation veniam consequat sunt<br/>
              nostrud amet.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-yellow-400 rounded flex items-center justify-center">
                <span className="text-black font-bold text-lg">D.</span>
              </div>
              <div className="text-left">
                <div className="text-black font-semibold">Disney Company</div>
                <div className="text-yellow-400 text-sm">★★★★★</div>
              </div>
            </div>
            
            {/* Pagination dots */}
            <div className="flex justify-center gap-2 mt-6">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white bg-opacity-50 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us section - exact match */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6 leading-tight">
                Why choose us<br/>
                for your service
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Cursus Congue Tortor Turpis Faucibus<br/>
                Ollicitudin Diam Massa Accumsan Egestas<br/>
                Habitant Ut Placerat Nascetur Sed
              </p>
              <button className="bg-black text-white px-8 py-3 font-medium underline">
                Learn More
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              {/* Online Support */}
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">👥</span>
                  </div>
                </div>
                <h3 className="text-black font-semibold mb-2">Online Support</h3>
                <p className="text-gray-600 text-sm">
                  Aliquam Porta Nisl Dolor,<br/>
                  Olestie Pellentesque Est<br/>
                  Molestie In.
                </p>
              </div>

              {/* Order Tracking */}
              <div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <div className="w-8 h-6 bg-yellow-400 rounded-sm"></div>
                </div>
                <h3 className="text-black font-semibold mb-2">Order Tracking</h3>
                <p className="text-gray-600 text-sm">
                  Aliquam Porta Nisl Dolor,<br/>
                  Olestie Pellentesque Est<br/>
                  Molestie In.
                </p>
              </div>

              {/* Drone Delivery */}
              <div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <div className="w-8 h-6 bg-gray-600 rounded-sm relative">
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="absolute -bottom-3 left-1 w-2 h-2 bg-yellow-400 rounded-sm"></div>
                  </div>
                </div>
                <h3 className="text-black font-semibold mb-2">Drone Delivery</h3>
                <p className="text-gray-600 text-sm">
                  Aliquam Porta Nisl Dolor,<br/>
                  Olestie Pellentesque Est<br/>
                  Molestie In.
                </p>
              </div>

              {/* Cost Save */}
              <div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <div className="w-8 h-6 bg-green-500 rounded-sm relative">
                    <div className="absolute inset-1 bg-white rounded-sm"></div>
                  </div>
                </div>
                <h3 className="text-black font-semibold mb-2">Cost Save</h3>
                <p className="text-gray-600 text-sm">
                  Aliquam Porta Nisl Dolor,<br/>
                  Olestie Pellentesque Est<br/>
                  Molestie In.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Solutions - exact match */}
      <section className="bg-gray-100 py-20">
  
        
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6 leading-tight">
                Emergency<br/>
                Solutions<br/>
                for Delivery
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Aliquam Porta Nisl Dolor, Molestie<br/>
                Pellentesque Est Molestie In, Morbi<br/>
                Mattis Neque, Elementum<br/>
                Ullamcorper Molestie
              </p>
            </div>
            
            <div className="text-center">
              {/* Large drone illustration */}
              <div className="relative inline-block mb-8">
                <div className="w-24 h-16 bg-gray-300 rounded-lg relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="absolute -bottom-8 left-4 w-8 h-6 bg-yellow-400 rounded-sm"></div>
                </div>
              </div>
              
              <div className="text-right space-y-3">
                <div className="flex items-center justify-end gap-3">
                  <span className="text-gray-600">→ Fastest Transit Times</span>
                </div>
                <div className="flex items-center justify-end gap-3">
                  <span className="text-gray-600">→ Security And Protection</span>
                </div>
                <div className="flex items-center justify-end gap-3">
                  <span className="text-gray-600">→ Safe Packaging</span>
                </div>
                <div className="flex items-center justify-end gap-3">
                  <span className="text-gray-600">→ Guaranteed Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - exact match */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-black mb-12">
            Frequently Asked<br/>
            Questions
          </h2>
          
          <div className="space-y-4">
            {[
              'What About Payment Security ?',
              'What if I Pick The Wrong Plan?',
              'When Should I Receive My Shipment?',
              'What Happens To My Shipment If I Cancel?',
              'What Are Some Types Of Projects You Enjoy?'
            ].map((faq, index) => (
              <div key={index} className="border border-gray-300 rounded-lg">
                <button 
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium text-black">{faq}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter section - exact match */}
      <section className="bg-blue-400 py-20 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-black mb-4">Let's Connect</h2>
          <p className="text-black mb-8">
            Cursus Congue Tortor Turpis Faucibus Ollicitudin Diam<br/>
            Massa Accumsan Egestas Habitant Ut Placerat
          </p>
          
          <div className="flex max-w-md mx-auto mb-12">
            <input 
              type="email" 
              placeholder="Enter Mail Address" 
              className="flex-1 px-4 py-3 border-none outline-none text-gray-600"
            />
            <button className="bg-black text-white px-6 py-3 font-medium">
              Subscribe
            </button>
          </div>
          
          {/* Train illustration */}
          <div className="relative inline-block">
            <div className="w-32 h-16 bg-gray-800 rounded-lg relative">
              <div className="absolute left-2 top-2 w-6 h-6 bg-yellow-400 rounded"></div>
              <div className="absolute right-2 top-2 w-6 h-6 bg-yellow-400 rounded"></div>
              <div className="absolute -bottom-2 left-4 w-4 h-4 bg-gray-600 rounded-full"></div>
              <div className="absolute -bottom-2 right-4 w-4 h-4 bg-gray-600 rounded-full"></div>
            </div>
            <div className="absolute -right-8 top-0 w-24 h-16 bg-gray-600 rounded-lg">
              <div className="absolute -bottom-2 left-2 w-4 h-4 bg-gray-800 rounded-full"></div>
              <div className="absolute -bottom-2 right-2 w-4 h-4 bg-gray-800 rounded-full"></div>
            </div>
            {/* Train tracks */}
            <div className="absolute -bottom-6 left-0 w-48 h-2 bg-gray-700 rounded-full"></div>
            <div className="absolute -bottom-4 left-0 w-48 h-1 bg-gray-800"></div>
          </div>
        </div>
      </section>

            <Footer/>
    </div>
  );
};

export default LogisticsWebsite;