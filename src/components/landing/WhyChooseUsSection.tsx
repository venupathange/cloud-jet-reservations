
import React from 'react';
import { Shield, CheckCircle2, Users, Heart } from "lucide-react";

interface WhyChooseUsSectionProps {
  isDark: boolean;
}

export default function WhyChooseUsSection({ isDark }: WhyChooseUsSectionProps) {
  return (
    <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="bg-airline-blue/10 text-airline-blue px-3 py-1 rounded-full font-medium text-sm">
            Our Commitment
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tighter sm:text-4xl">Why Choose Us</h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-3xl mx-auto`}>
              We're committed to providing the best travel experience for all our customers
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1606768666853-403c90a981ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
              alt="Friendly cabin crew" 
              className="rounded-2xl shadow-xl max-h-96 object-cover"
            />
          </div>

          <div className="flex flex-col space-y-8 justify-center">
            <div className="flex items-start space-x-4">
              <div className="bg-airline-blue/10 p-4 rounded-xl">
                <Shield className="h-8 w-8 text-airline-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Safety First</h3>
                <p className="text-gray-600 mt-2">Your safety is our utmost priority with rigorous maintenance protocols, regular safety audits, and highly trained staff.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-airline-blue/10 p-4 rounded-xl">
                <CheckCircle2 className="h-8 w-8 text-airline-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Best Price Guarantee</h3>
                <p className="text-gray-600 mt-2">We offer competitive pricing, regular promotions, and special discounts to ensure you get the best value for your money.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-airline-blue/10 p-4 rounded-xl">
                <Users className="h-8 w-8 text-airline-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Exceptional Service</h3>
                <p className="text-gray-600 mt-2">Our dedicated support team is available 24/7 to assist with any queries or concerns in multiple Indian languages.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-airline-blue/10 p-4 rounded-xl">
                <Heart className="h-8 w-8 text-airline-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Customer Satisfaction</h3>
                <p className="text-gray-600 mt-2">With a 96% customer satisfaction rate, we continuously strive to exceed expectations on every flight.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
