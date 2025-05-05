
import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <h1 className="text-3xl font-bold mt-8 mb-4">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
          <p className="mb-6">
            Have questions or feedback? We're here to help! Fill out the form and our team 
            will get back to you as soon as possible.
          </p>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input 
                id="name" 
                type="text" 
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input 
                id="email" 
                type="email" 
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <input 
                id="subject" 
                type="text" 
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="How can we help?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea 
                id="message" 
                rows={5} 
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your message here..."
              />
            </div>
            <button 
              type="button" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Customer Service</h3>
              <p>24/7 Support: +1 (555) 123-4567</p>
              <p>Email: support@cloudjetairways.com</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Booking Inquiries</h3>
              <p>Phone: +1 (555) 234-5678</p>
              <p>Email: bookings@cloudjetairways.com</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Corporate Headquarters</h3>
              <address className="not-italic">
                123 Aviation Way<br />
                Skyline Tower, 45th Floor<br />
                New York, NY 10001<br />
                United States
              </address>
            </div>
            <div>
              <h3 className="text-lg font-medium">Office Hours</h3>
              <p>Monday to Friday: 8:00 AM - 8:00 PM</p>
              <p>Saturday: 9:00 AM - 5:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
            <div className="mt-8">
              <Link 
                to="/"
                className="text-blue-600 hover:underline"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
