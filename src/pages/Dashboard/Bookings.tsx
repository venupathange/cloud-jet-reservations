
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import BookingCard from "@/components/bookings/BookingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Search, Calendar } from "lucide-react";

// Default mock bookings if none in localStorage
const DEFAULT_BOOKINGS = [
  {
    id: 'BK-12345',
    flightId: 'CJ-1245',
    userId: 'user1',
    userName: 'John Doe',
    from: 'New York',
    fromCode: 'JFK',
    to: 'London',
    toCode: 'LHR',
    departureDate: '2025-06-15',
    departureTime: '09:30',
    arrivalDate: '2025-06-16',
    arrivalTime: '22:15',
    price: 430,
    status: 'confirmed' as const,
  },
  {
    id: 'BK-54321',
    flightId: 'CJ-2347',
    userId: 'user2',
    userName: 'Jane Smith',
    from: 'London',
    fromCode: 'LHR',
    to: 'Paris',
    toCode: 'CDG',
    departureDate: '2025-06-22',
    departureTime: '14:15',
    arrivalDate: '2025-06-22',
    arrivalTime: '16:30',
    price: 180,
    status: 'pending' as const,
  },
  {
    id: 'BK-98765',
    flightId: 'CJ-3782',
    userId: 'user1',
    userName: 'John Doe',
    from: 'Paris',
    fromCode: 'CDG',
    to: 'Dubai',
    toCode: 'DXB',
    departureDate: '2025-06-30',
    departureTime: '22:45',
    arrivalDate: '2025-07-01',
    arrivalTime: '07:20',
    price: 720,
    status: 'cancelled' as const,
  }
];

export default function BookingsPage() {
  const { user } = useAuth();
  const isAdmin = user?.userType === 'admin';
  
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);

  // Load bookings from localStorage on component mount
  useEffect(() => {
    try {
      // Get bookings from localStorage or use default if none
      const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      
      if (savedBookings && savedBookings.length > 0) {
        console.log("Found bookings in localStorage:", savedBookings);
        
        if (isAdmin) {
          // Admin sees all bookings
          setBookings(savedBookings);
        } else {
          // Users only see their own bookings
          const userBookings = savedBookings.filter(booking => 
            booking.userId === user?.email
          );
          
          if (userBookings.length > 0) {
            setBookings(userBookings);
          } else {
            // If a user has no bookings yet, show a filtered version of the default bookings
            // This is just for demo purposes
            setBookings(DEFAULT_BOOKINGS.filter(booking => 
              booking.userId === 'user1' // Using 'user1' as current user for demo
            ));
          }
        }
      } else {
        // No bookings found in localStorage, use default bookings
        if (!isAdmin) {
          setBookings(DEFAULT_BOOKINGS.filter(booking => 
            booking.userId === 'user1' // Using 'user1' as current user for demo
          ));
        } else {
          setBookings(DEFAULT_BOOKINGS);
        }
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
      // Fallback to default bookings
      if (!isAdmin) {
        setBookings(DEFAULT_BOOKINGS.filter(booking => 
          booking.userId === 'user1'
        ));
      } else {
        setBookings(DEFAULT_BOOKINGS);
      }
    }
  }, [isAdmin, user?.email]);

  useEffect(() => {
    // Filter bookings based on search term
    const filtered = bookings.filter(
      (booking) =>
        booking.flightId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (isAdmin && booking.userName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredBookings(filtered);
  }, [searchTerm, bookings, isAdmin]);

  const handleCancelBooking = (id) => {
    // Update booking status in localStorage
    try {
      const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const updatedBookings = savedBookings.map(booking => 
        booking.id === id ? { ...booking, status: 'cancelled' } : booking
      );
      
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      
      // Also update the state
      const newBookings = bookings.map(booking => 
        booking.id === id ? { ...booking, status: 'cancelled' } : booking
      );
      
      setBookings(newBookings);
      
      toast({
        title: "Booking Cancelled",
        description: `Booking ${id} has been cancelled successfully.`,
      });
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast({
        title: "Error",
        description: "Failed to cancel booking. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleViewDetails = (id) => {
    // In a real app, this would navigate to a details page or open a modal
    toast({
      title: "Booking Details",
      description: `Viewing details for booking ${id}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Bookings</h1>
        <p className="text-gray-500">
          {isAdmin 
            ? 'Manage all customer bookings in the system.' 
            : 'View and manage your flight bookings.'}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder={isAdmin ? "Search by destination, flight number, or customer name..." : "Search by destination or flight number..."}
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div>
            <Input id="date" type="date" className="w-full" />
          </div>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              onCancel={handleCancelBooking}
              onViewDetails={handleViewDetails}
              {...booking}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto text-gray-300" />
            <h3 className="mt-4 text-lg font-medium">No bookings found</h3>
            <p className="mt-1 text-gray-500">
              {searchTerm ? "Try adjusting your search terms" : "You haven't made any bookings yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
