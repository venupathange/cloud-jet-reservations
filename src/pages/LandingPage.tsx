
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plane, CreditCard, Calendar, MessageSquare, Shield, CheckCircle2 } from "lucide-react";
import Header from "@/components/layout/Header";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sky-100 to-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Book Your Dream Flights with Cloud Jet Services</h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Your journey begins with us. Explore our wide range of flights and enjoy a seamless booking experience.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/login">
                  <Button className="bg-airline-blue hover:bg-airline-navy">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline">Create an Account</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1493305323328-18aa5ad45c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Airplane in clouds" 
                className="rounded-xl shadow-lg w-full max-w-md mx-auto object-cover animate-float" 
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Explore the premium services offered by Cloud Jet
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm hover:shadow-md transition">
              <div className="rounded-full bg-airline-blue p-3">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold">Premium Flights</h3>
              <p className="text-center text-sm text-gray-500">Book luxury flights to your destination</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm hover:shadow-md transition">
              <div className="rounded-full bg-airline-blue p-3">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold">Easy Payments</h3>
              <p className="text-center text-sm text-gray-500">Multiple payment options for convenience</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm hover:shadow-md transition">
              <div className="rounded-full bg-airline-blue p-3">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold">Flight Management</h3>
              <p className="text-center text-sm text-gray-500">Easily manage your bookings</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm hover:shadow-md transition">
              <div className="rounded-full bg-airline-blue p-3">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold">24/7 Support</h3>
              <p className="text-center text-sm text-gray-500">Customer service available anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Popular Destinations</h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our most sought-after flight destinations
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
                alt="New York Skyline" 
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white">New York</h3>
                <p className="text-white/80">Flights from $299</p>
                <Link to="/dashboard/flights" className="mt-3 text-white bg-airline-blue/80 hover:bg-airline-blue px-4 py-2 rounded-md inline-block text-sm">
                  Explore Flights
                </Link>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
                alt="Dubai Cityscape" 
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white">Dubai</h3>
                <p className="text-white/80">Flights from $499</p>
                <Link to="/dashboard/flights" className="mt-3 text-white bg-airline-blue/80 hover:bg-airline-blue px-4 py-2 rounded-md inline-block text-sm">
                  Explore Flights
                </Link>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
                alt="Swiss Alps" 
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white">Switzerland</h3>
                <p className="text-white/80">Flights from $399</p>
                <Link to="/dashboard/flights" className="mt-3 text-white bg-airline-blue/80 hover:bg-airline-blue px-4 py-2 rounded-md inline-block text-sm">
                  Explore Flights
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose Us</h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We provide the best flight experience for our customers
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-airline-blue/10 p-2 rounded-md">
                  <Shield className="h-6 w-6 text-airline-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Safety First</h3>
                  <p className="text-gray-500">Your safety is our top priority with rigorous maintenance protocols and highly trained staff.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-airline-blue/10 p-2 rounded-md">
                  <CheckCircle2 className="h-6 w-6 text-airline-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Best Price Guarantee</h3>
                  <p className="text-gray-500">We offer competitive pricing and regular promotions to ensure you get the best value.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-airline-blue/10 p-2 rounded-md">
                  <MessageSquare className="h-6 w-6 text-airline-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Exceptional Customer Service</h3>
                  <p className="text-gray-500">Our dedicated support team is available 24/7 to assist with any queries or concerns.</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
                alt="Customer service representative" 
                className="rounded-xl shadow-lg max-h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-airline-blue text-white py-8 mt-auto">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">About</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Flights</a></li>
                <li><a href="#" className="hover:underline">Special Offers</a></li>
                <li><a href="#" className="hover:underline">Gift Cards</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">FAQs</a></li>
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Refund Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-airline-lightblue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="hover:text-airline-lightblue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="hover:text-airline-lightblue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center">
            <p>© 2025 Cloud Jet Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
