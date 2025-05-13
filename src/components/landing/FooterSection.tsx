
import React from 'react';
import { Link } from "react-router-dom";

interface FooterSectionProps {
  isDark: boolean;
}

export default function FooterSection({ isDark }: FooterSectionProps) {
  return (
    <footer className={`${isDark ? 'bg-gray-900' : 'bg-gray-900'} text-white py-12 mt-auto`}>
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition">About Us</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Careers</a></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition">Contact</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-3">
              <li><Link to="/dashboard/flights" className="text-gray-300 hover:text-white transition">Domestic Flights</Link></li>
              <li><Link to="/dashboard/flights" className="text-gray-300 hover:text-white transition">International Flights</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Special Offers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Gift Cards</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition">FAQs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Refund Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
            <p className="text-gray-400 text-sm">Contact Us:</p>
            <p className="text-gray-300 text-sm">+91 1800-123-4567</p>
            <p className="text-gray-300 text-sm">support@cloudjet.com</p>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">© 2025 Cloud Jet Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
