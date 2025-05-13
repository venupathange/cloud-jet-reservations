
import React from 'react';

interface StatsSectionProps {
  isDark: boolean;
}

export default function StatsSection({ isDark }: StatsSectionProps) {
  return (
    <section className={`py-12 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} border-y`}>
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="text-center p-4">
            <p className="text-3xl md:text-4xl font-bold text-airline-blue">5M+</p>
            <p className={isDark ? "text-gray-300" : "text-gray-500"}>Happy Customers</p>
          </div>
          <div className="text-center p-4">
            <p className="text-3xl md:text-4xl font-bold text-airline-blue">100+</p>
            <p className={isDark ? "text-gray-300" : "text-gray-500"}>Destinations</p>
          </div>
          <div className="text-center p-4">
            <p className="text-3xl md:text-4xl font-bold text-airline-blue">500+</p>
            <p className={isDark ? "text-gray-300" : "text-gray-500"}>Daily Flights</p>
          </div>
          <div className="text-center p-4">
            <p className="text-3xl md:text-4xl font-bold text-airline-blue">99%</p>
            <p className={isDark ? "text-gray-300" : "text-gray-500"}>On-time Performance</p>
          </div>
        </div>
      </div>
    </section>
  );
}
