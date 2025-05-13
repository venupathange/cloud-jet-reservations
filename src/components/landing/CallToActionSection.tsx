
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CallToActionSection() {
  return (
    <section className="py-16 bg-airline-blue text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Experience Cloud Jet Services?</h2>
          <p className="text-white/80 md:text-xl">Join millions of satisfied customers who trust us for their travel needs across India and beyond.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/login">
              <Button className="bg-white text-airline-blue hover:bg-gray-100 text-lg px-8 py-6">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="border-white text-white hover:bg-white/20 text-lg px-8 py-6">Create Account</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
