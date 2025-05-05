
import { useState, useEffect } from "react";
import { useApiClient } from "@/utils/apiClient";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Package, MapPin, Calendar, Users, Search } from "lucide-react";

// Define the travel package interface
interface TravelPackage {
  id: string;
  name: string;
  description: string;
  destination: string;
  image: string;
  price: number;
  duration: string;
  includes: string[];
  rating: number;
  category: 'family' | 'adventure' | 'romantic' | 'business';
}

// Mock data for travel packages
// In production, this would come from the API
const MOCK_PACKAGES: TravelPackage[] = [
  {
    id: "pkg-001",
    name: "Paris Getaway",
    description: "Experience the romantic city of Paris with this all-inclusive package including flight, hotel and city tour.",
    destination: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000",
    price: 1200,
    duration: "5 days, 4 nights",
    includes: ["Return flights", "4-star hotel", "City tour", "Seine river cruise"],
    rating: 4.8,
    category: 'romantic'
  },
  {
    id: "pkg-002",
    name: "Dubai Family Adventure",
    description: "Take your family to Dubai with this special package including desert safari and waterpark tickets.",
    destination: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000",
    price: 1800,
    duration: "7 days, 6 nights",
    includes: ["Return flights", "5-star hotel", "Desert safari", "Waterpark tickets", "Burj Khalifa tickets"],
    rating: 4.9,
    category: 'family'
  },
  {
    id: "pkg-003",
    name: "New York Business Trip",
    description: "Perfect for business travelers with premium flights, central accommodation and co-working space access.",
    destination: "New York, USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1000",
    price: 2000,
    duration: "4 days, 3 nights",
    includes: ["Business class flights", "4-star hotel", "Co-working space access", "Airport transfers"],
    rating: 4.6,
    category: 'business'
  },
  {
    id: "pkg-004",
    name: "Swiss Alps Adventure",
    description: "Experience thrilling outdoor activities in the Swiss Alps with this adventure package.",
    destination: "Interlaken, Switzerland",
    image: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&q=80&w=1000",
    price: 1600,
    duration: "6 days, 5 nights",
    includes: ["Return flights", "Mountain chalet", "Skiing pass", "Paragliding experience", "Mountain hiking"],
    rating: 4.7,
    category: 'adventure'
  }
];

export default function TravelPackagesPage() {
  const apiClient = useApiClient();
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<TravelPackage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  /**
   * BACKEND INTEGRATION NOTE:
   * - Replace with API call to /api/packages
   * - Handle errors gracefully
   * - Implement proper loading state
   */
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // In a real implementation, this would be:
        // const data = await apiClient.get('/packages');
        // setPackages(data);
        
        // For now, we'll just use our mock data with a delay to simulate API call
        setTimeout(() => {
          setPackages(MOCK_PACKAGES);
          setFilteredPackages(MOCK_PACKAGES);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching packages:", error);
        toast({
          title: "Error",
          description: "Failed to load travel packages. Please try again later.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let filtered = packages;
    
    // Filter by category if not "all"
    if (activeTab !== "all") {
      filtered = filtered.filter(pkg => pkg.category === activeTab);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        pkg =>
          pkg.name.toLowerCase().includes(term) ||
          pkg.description.toLowerCase().includes(term) ||
          pkg.destination.toLowerCase().includes(term)
      );
    }
    
    setFilteredPackages(filtered);
  }, [searchTerm, packages, activeTab]);

  /**
   * BACKEND INTEGRATION NOTE:
   * - This would make a POST request to /api/bookings/package/{id}
   * - Should include validation and error handling
   * - Redirect to booking confirmation page after successful booking
   */
  const handleBookPackage = (packageId: string) => {
    toast({
      title: "Package Booking Initiated",
      description: "You'll be redirected to complete your booking.",
    });
    // In a real implementation, this would redirect to a booking form
    console.log(`Booking package: ${packageId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Travel Packages</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Explore our curated travel packages with exclusive deals on flights, hotels, and experiences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <Input
              placeholder="Search destinations, packages..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Package categories tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="all">All Packages</TabsTrigger>
          <TabsTrigger value="family">Family</TabsTrigger>
          <TabsTrigger value="adventure">Adventure</TabsTrigger>
          <TabsTrigger value="romantic">Romantic</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Loading skeletons
              Array(3).fill(0).map((_, index) => (
                <Card key={`skeleton-${index}`} className="overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-gray-800"></div>
                  <CardHeader>
                    <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                    <div className="h-4 mt-2 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                    <div className="h-4 mt-2 bg-gray-200 dark:bg-gray-800 rounded"></div>
                    <div className="h-4 mt-2 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                  </CardFooter>
                </Card>
              ))
            ) : filteredPackages.length > 0 ? (
              filteredPackages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name}
                      className="object-cover w-full h-full transition-transform hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-airline-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                      ${pkg.price}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{pkg.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-airline-lightblue" />
                      {pkg.destination}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{pkg.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      <span className="flex items-center text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        <Calendar className="h-3 w-3 mr-1" />
                        {pkg.duration}
                      </span>
                      <span className="flex items-center text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        <Users className="h-3 w-3 mr-1" />
                        {pkg.category}
                      </span>
                      <span className="flex items-center text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        ★ {pkg.rating}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Package Includes:</Label>
                      <ul className="text-xs space-y-1">
                        {pkg.includes.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-airline-blue mr-2">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-airline-blue hover:bg-airline-navy"
                      onClick={() => handleBookPackage(pkg.id)}
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <Package className="h-12 w-12 mx-auto text-gray-300" />
                <h3 className="mt-4 text-lg font-medium">No packages found</h3>
                <p className="mt-1 text-gray-500">
                  {searchTerm ? "Try adjusting your search terms" : "Check back soon for new packages"}
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* We use the same content for all tabs, as the filtering is done in the useEffect */}
        <TabsContent value="family" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Same content structure as "all" tab */}
            {filteredPackages.length > 0 ? (
              filteredPackages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden transition-all hover:shadow-lg">
                  {/* Same card structure as in "all" tab */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name}
                      className="object-cover w-full h-full transition-transform hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-airline-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                      ${pkg.price}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{pkg.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-airline-lightblue" />
                      {pkg.destination}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{pkg.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      <span className="flex items-center text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        <Calendar className="h-3 w-3 mr-1" />
                        {pkg.duration}
                      </span>
                      <span className="flex items-center text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        <Users className="h-3 w-3 mr-1" />
                        {pkg.category}
                      </span>
                      <span className="flex items-center text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        ★ {pkg.rating}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Package Includes:</Label>
                      <ul className="text-xs space-y-1">
                        {pkg.includes.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-airline-blue mr-2">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-airline-blue hover:bg-airline-navy"
                      onClick={() => handleBookPackage(pkg.id)}
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <Package className="h-12 w-12 mx-auto text-gray-300" />
                <h3 className="mt-4 text-lg font-medium">No family packages found</h3>
                <p className="mt-1 text-gray-500">
                  Check back soon for new family vacation packages
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Similar TabsContent for adventure, romantic, and business categories */}
        <TabsContent value="adventure" className="mt-0">
          {/* Similar structure as other tabs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.length > 0 ? (
              filteredPackages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden transition-all hover:shadow-lg">
                  {/* Same card structure */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name}
                      className="object-cover w-full h-full transition-transform hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-airline-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                      ${pkg.price}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{pkg.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-airline-lightblue" />
                      {pkg.destination}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{pkg.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      <span className="flex items-center text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        <Calendar className="h-3 w-3 mr-1" />
                        {pkg.duration}
                      </span>
                      <span className="flex items-center text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        <Users className="h-3 w-3 mr-1" />
                        {pkg.category}
                      </span>
                      <span className="flex items-center text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        ★ {pkg.rating}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Package Includes:</Label>
                      <ul className="text-xs space-y-1">
                        {pkg.includes.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-airline-blue mr-2">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-airline-blue hover:bg-airline-navy"
                      onClick={() => handleBookPackage(pkg.id)}
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <Package className="h-12 w-12 mx-auto text-gray-300" />
                <h3 className="mt-4 text-lg font-medium">No adventure packages found</h3>
                <p className="mt-1 text-gray-500">
                  Check back soon for new adventure packages
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="romantic" className="mt-0">
          {/* Similar structure as other tabs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.length > 0 ? (
              filteredPackages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden transition-all hover:shadow-lg">
                  {/* Same card structure */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name}
                      className="object-cover w-full h-full transition-transform hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-airline-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                      ${pkg.price}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{pkg.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-airline-lightblue" />
                      {pkg.destination}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{pkg.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      <span className="flex items-center text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        <Calendar className="h-3 w-3 mr-1" />
                        {pkg.duration}
                      </span>
                      <span className="flex items-center text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        <Users className="h-3 w-3 mr-1" />
                        {pkg.category}
                      </span>
                      <span className="flex items-center text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        ★ {pkg.rating}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Package Includes:</Label>
                      <ul className="text-xs space-y-1">
                        {pkg.includes.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-airline-blue mr-2">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-airline-blue hover:bg-airline-navy"
                      onClick={() => handleBookPackage(pkg.id)}
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <Package className="h-12 w-12 mx-auto text-gray-300" />
                <h3 className="mt-4 text-lg font-medium">No romantic packages found</h3>
                <p className="mt-1 text-gray-500">
                  Check back soon for new romantic getaway packages
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="business" className="mt-0">
          {/* Similar structure as other tabs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.length > 0 ? (
              filteredPackages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden transition-all hover:shadow-lg">
                  {/* Same card structure */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name}
                      className="object-cover w-full h-full transition-transform hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-airline-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                      ${pkg.price}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{pkg.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-airline-lightblue" />
                      {pkg.destination}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{pkg.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      <span className="flex items-center text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        <Calendar className="h-3 w-3 mr-1" />
                        {pkg.duration}
                      </span>
                      <span className="flex items-center text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        <Users className="h-3 w-3 mr-1" />
                        {pkg.category}
                      </span>
                      <span className="flex items-center text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        ★ {pkg.rating}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Package Includes:</Label>
                      <ul className="text-xs space-y-1">
                        {pkg.includes.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-airline-blue mr-2">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-airline-blue hover:bg-airline-navy"
                      onClick={() => handleBookPackage(pkg.id)}
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <Package className="h-12 w-12 mx-auto text-gray-300" />
                <h3 className="mt-4 text-lg font-medium">No business packages found</h3>
                <p className="mt-1 text-gray-500">
                  Check back soon for new business travel packages
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
