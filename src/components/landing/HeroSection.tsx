
import React from 'react';
import FlightSearchForm from "@/components/search/FlightSearchForm";

interface HeroSectionProps {
  isDark: boolean;
}

export default function HeroSection({ isDark }: HeroSectionProps) {
  return (
    <section className="relative py-20 md:py-32">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1559367183-975d410de28e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80")',
          opacity: isDark ? 0.2 : 0.3
        }}
      ></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className={`inline-block ${isDark ? 'bg-airline-blue/20 text-airline-lightblue' : 'bg-airline-blue/10 text-airline-blue'} px-3 py-1 rounded-full font-medium text-sm mb-2`}>
              #1 Airline in India
            </div>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">Book Your Dream Flights with Cloud Jet Services</h1>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} md:text-xl max-w-lg`}>
              Your journey begins with us. Explore our wide range of flights and enjoy a seamless booking experience with the best airfares in India.
            </p>
          </div>
          <div className="flex items-center justify-center relative">
            <FlightSearchForm variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
