
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Search, Calendar, MapPin } from "lucide-react";

const MOCK_FLIGHTS = [
  {
    id: 'CJ-1245',
    from: 'New York',
    fromCode: 'JFK',
    to: 'London',
    toCode: 'LHR',
    departureDate: '2025-06-15',
    departureTime: '09:30',
    arrivalDate: '2025-06-16',
    arrivalTime: '22:15',
    price: 430,
    seatsAvailable: 42,
  },
  {
    id: 'CJ-2347',
    from: 'London',
    fromCode: 'LHR',
    to: 'Paris',
    toCode: 'CDG',
    departureDate: '2025-06-22',
    departureTime: '14:15',
    arrivalDate: '2025-06-22',
    arrivalTime: '16:30',
    price: 180,
    seatsAvailable: 28,
  },
  {
    id: 'CJ-3782',
    from: 'Paris',
    fromCode: 'CDG',
    to: 'Dubai',
    toCode: 'DXB',
    departureDate: '2025-06-30',
    departureTime: '22:45',
    arrivalDate: '2025-07-01',
    arrivalTime: '07:20',
    price: 720,
    seatsAvailable: 15,
  },
  {
    id: 'CJ-9012',
    from: 'Tokyo',
    fromCode: 'HND',
    to: 'Sydney',
    toCode: 'SYD',
    departureDate: '2025-07-15',
    departureTime: '00:30',
    arrivalDate: '2025-07-16',
    arrivalTime: '10:45',
    price: 850,
    seatsAvailable: 5,
  },
];

export default function FlightsPage() {
  const { user } = useAuth();
  const isAdmin = user?.userType === 'admin';
  const [searchTerm, setSearchTerm] = useState("");
  const [flights, setFlights] = useState(MOCK_FLIGHTS);

  const filteredFlights = flights.filter(
    (flight) =>
      flight.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Available Flights</h1>
          <p className="text-gray-500">
            {isAdmin
              ? 'Manage all flights in the system.'
              : 'Browse and book available flights.'}
          </p>
        </div>
        {isAdmin && (
          <Button className="bg-airline-blue hover:bg-airline-navy">
            <Plane className="mr-2 h-4 w-4" />
            Add New Flight
          </Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search flights by destination or flight number..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div>
            <Label htmlFor="date" className="sr-only">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              className="w-full"
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
            <Card key={flight.id} className="overflow-hidden hover:shadow-lg transition">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                  <div className="lg:col-span-5 p-6">
                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                      <div className="flex items-center mb-4 md:mb-0">
                        <Plane className="h-5 w-5 text-airline-blue mr-2" />
                        <span className="font-bold text-lg">{flight.id}</span>
                        <span className="text-gray-500 ml-2">• Cloud Jet Airways</span>
                      </div>
                      <div className="font-bold text-xl text-airline-blue">
                        ₹{(flight.price * 83).toFixed(2)}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                      <div className="space-y-1 mb-4 sm:mb-0">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                          <div className="flex items-center">
                            <span className="font-bold">{flight.fromCode}</span>
                            <span className="mx-2 text-gray-500">•</span>
                            <span className="text-gray-500">{flight.from}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                          <div className="flex items-center">
                            <span className="font-bold">{flight.toCode}</span>
                            <span className="mx-2 text-gray-500">•</span>
                            <span className="text-gray-500">{flight.to}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                          <div className="flex items-center">
                            <span className="font-bold">{flight.departureTime}</span>
                            <span className="mx-2 text-gray-500">•</span>
                            <span className="text-gray-500">{flight.departureDate}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                          <div className="flex items-center">
                            <span className="font-bold">{flight.arrivalTime}</span>
                            <span className="mx-2 text-gray-500">•</span>
                            <span className="text-gray-500">{flight.arrivalDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 p-6 bg-gray-50 flex flex-col justify-center border-t lg:border-t-0 lg:border-l">
                    <div className="text-center mb-4">
                      <p className="text-gray-500 mb-1">Seats available</p>
                      <p className="font-bold text-lg">{flight.seatsAvailable}</p>
                    </div>
                    {isAdmin ? (
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">Edit</Button>
                        <Button variant="destructive" className="w-full">Delete</Button>
                      </div>
                    ) : (
                      <Button className="w-full bg-airline-blue hover:bg-airline-navy">Book Now</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <Plane className="h-12 w-12 mx-auto text-gray-300" />
            <h3 className="mt-4 text-lg font-medium">No flights found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
