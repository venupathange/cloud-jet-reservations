
import React from 'react';
import { Plane, CreditCard, Calendar, MessageSquare } from "lucide-react";

interface FeaturesSectionProps {
  isDark: boolean;
}

export default function FeaturesSection({ isDark }: FeaturesSectionProps) {
  return (
    <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className={`${isDark ? 'bg-airline-blue/20 text-airline-lightblue' : 'bg-airline-blue/10 text-airline-blue'} px-3 py-1 rounded-full font-medium text-sm`}>
            Premium Services
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl">Why Fly With Cloud Jet?</h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-3xl mx-auto`}>
              Experience the premium services offered by Cloud Jet Services across India and internationally
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className={`flex flex-col items-center space-y-4 rounded-xl border ${isDark ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' : 'border-gray-200 bg-white hover:shadow-md'} p-8 shadow-sm transition`}>
            <div className="rounded-full bg-airline-blue p-4">
              <Plane className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold">Premium Flights</h3>
            <p className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Modern fleet with spacious seating and exceptional comfort on every journey</p>
          </div>
          <div className={`flex flex-col items-center space-y-4 rounded-xl border ${isDark ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' : 'border-gray-200 bg-white hover:shadow-md'} p-8 shadow-sm transition`}>
            <div className="rounded-full bg-airline-blue p-4">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold">Easy Payments</h3>
            <p className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Secure payment options including UPI, net banking, and all credit/debit cards</p>
          </div>
          <div className={`flex flex-col items-center space-y-4 rounded-xl border ${isDark ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' : 'border-gray-200 bg-white hover:shadow-md'} p-8 shadow-sm transition`}>
            <div className="rounded-full bg-airline-blue p-4">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold">Flight Management</h3>
            <p className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Easily manage bookings, check-in online, and get real-time flight updates</p>
          </div>
          <div className={`flex flex-col items-center space-y-4 rounded-xl border ${isDark ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' : 'border-gray-200 bg-white hover:shadow-md'} p-8 shadow-sm transition`}>
            <div className="rounded-full bg-airline-blue p-4">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold">24/7 Support</h3>
            <p className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Customer service available anytime via chat, call, or email in multiple languages</p>
          </div>
        </div>
      </div>
    </section>
  );
}
