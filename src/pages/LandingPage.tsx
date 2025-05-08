
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';

const LandingPage = () => {
  // Helper function to scroll to a section smoothly
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center">
            <Header />
            <div className="hidden md:flex space-x-4">
              <Button variant="ghost" onClick={() => scrollToSection('destinations')}>
                Destinations
              </Button>
              <Button variant="ghost" onClick={() => scrollToSection('features')}>
                Features
              </Button>
              <Button variant="ghost" onClick={() => scrollToSection('testimonials')}>
                Testimonials
              </Button>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>

          <div className="mt-24 mb-32 max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Experience the Sky with Us
            </h1>
            <p className="text-xl mb-8">
              Travel to over 100 destinations worldwide with comfort and style.
              Book your flight today and enjoy our premium service.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="w-full md:w-auto">
                  Book Now
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full md:w-auto"
                onClick={() => scrollToSection('features')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Section */}
      <div id="destinations" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Destination Cards */}
            {['New York', 'Paris', 'Tokyo', 'Dubai', 'London', 'Sydney'].map((city, index) => (
              <div 
                key={index}
                className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-transform hover:scale-[1.02]"
              >
                <div className="h-48 bg-blue-200 dark:bg-blue-900"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{city}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Experience the beauty and culture of {city} with our exclusive travel packages.
                  </p>
                  <Button variant="outline" className="w-full">Explore Deals</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Cards */}
            {[
              { title: "Best Prices", desc: "Competitive prices for all our destinations" },
              { title: "Comfortable Fleet", desc: "Modern aircraft with spacious seating" },
              { title: "24/7 Support", desc: "Customer service available round the clock" },
              { title: "Reward Program", desc: "Earn points with every flight" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-md text-center"
              >
                <div className="h-12 w-12 bg-blue-600 dark:bg-blue-500 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial Cards */}
            {[
              { name: "John Doe", role: "Business Traveler", quote: "The best airline experience I've ever had." },
              { name: "Jane Smith", role: "Family Traveler", quote: "Traveling with kids was never easier!" },
              { name: "Robert Jones", role: "Tourist", quote: "Exceptional service and comfortable flights." }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="p-8 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
              >
                <p className="text-gray-600 dark:text-gray-300 mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-blue-200 dark:bg-blue-700 rounded-full mr-4"></div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Take Flight?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers. Book your next trip with us today.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="w-full md:w-auto">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="w-full md:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Cloud Jet Airways</h3>
              <p className="text-gray-400">
                Your journey, our passion.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>© 2025 Cloud Jet Airways. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
