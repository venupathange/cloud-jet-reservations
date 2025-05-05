
import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <h1 className="text-3xl font-bold mt-8 mb-4">About Us</h1>
      <div className="prose max-w-none">
        <p className="text-lg">
          Cloud Jet Airways is a premier airline service dedicated to providing exceptional travel experiences 
          to customers worldwide. Established in 2010, we have grown to become one of the most 
          trusted names in the aviation industry.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3">Our Mission</h2>
        <p>
          To provide safe, reliable, and comfortable air travel while delivering outstanding customer 
          service that exceeds expectations. We strive to connect people, cultures, and businesses 
          across the globe through an extensive network of destinations.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3">Our Values</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Safety First</strong> - The safety of our passengers and crew is our top priority.</li>
          <li><strong>Customer Focus</strong> - We are committed to understanding and meeting our customers' needs.</li>
          <li><strong>Reliability</strong> - We aim for punctuality and dependability in all our operations.</li>
          <li><strong>Innovation</strong> - We continuously improve our services by embracing new technologies and ideas.</li>
          <li><strong>Sustainability</strong> - We are dedicated to minimizing our environmental footprint.</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-3">Our Fleet</h2>
        <p>
          Our modern fleet consists of the latest aircraft models, ensuring fuel efficiency, 
          reduced emissions, and enhanced passenger comfort. All our aircraft are maintained 
          to the highest standards of safety and reliability.
        </p>
        <div className="mt-8">
          <Link 
            to="/contact" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
