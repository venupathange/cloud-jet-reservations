
import React from 'react';
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DestinationsSectionProps {
  isDark: boolean;
}

export default function DestinationsSection({ isDark }: DestinationsSectionProps) {
  return (
    <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="bg-airline-blue/10 text-airline-blue px-3 py-1 rounded-full font-medium text-sm">
            Explore India & Beyond
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tighter sm:text-4xl">Popular Destinations</h2>
            <p className="text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-3xl mx-auto">
              Discover our most sought-after flight destinations across India and international locations
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="relative group overflow-hidden rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
              alt="New Delhi" 
              className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-white mr-2" />
                <p className="text-white/90 text-sm">Delhi, India</p>
              </div>
              <h3 className="text-2xl font-bold text-white mt-2">New Delhi</h3>
              <p className="text-white/90 mb-3">India's historic capital</p>
              <p className="text-white font-bold">From ₹2,999</p>
              <Link to="/dashboard/flights" className="mt-4 text-white bg-airline-blue hover:bg-airline-navy px-5 py-2 rounded-md inline-block text-sm">
                Explore Flights
              </Link>
            </div>
            <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-medium">
              Popular
            </div>
          </div>
          
          <div className="relative group overflow-hidden rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
              alt="Mumbai" 
              className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-white mr-2" />
                <p className="text-white/90 text-sm">Mumbai, India</p>
              </div>
              <h3 className="text-2xl font-bold text-white mt-2">Mumbai</h3>
              <p className="text-white/90 mb-3">The city of dreams</p>
              <p className="text-white font-bold">From ₹3,499</p>
              <Link to="/dashboard/flights" className="mt-4 text-white bg-airline-blue hover:bg-airline-navy px-5 py-2 rounded-md inline-block text-sm">
                Explore Flights
              </Link>
            </div>
          </div>
          
          <div className="relative group overflow-hidden rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
              alt="Dubai" 
              className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-white mr-2" />
                <p className="text-white/90 text-sm">UAE</p>
              </div>
              <h3 className="text-2xl font-bold text-white mt-2">Dubai</h3>
              <p className="text-white/90 mb-3">City of luxury</p>
              <p className="text-white font-bold">From ₹24,999</p>
              <Link to="/dashboard/flights" className="mt-4 text-white bg-airline-blue hover:bg-airline-navy px-5 py-2 rounded-md inline-block text-sm">
                Explore Flights
              </Link>
            </div>
            <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-medium">
              International
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Link to="/dashboard/flights">
            <Button className="bg-airline-blue hover:bg-airline-navy">View All Destinations</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
