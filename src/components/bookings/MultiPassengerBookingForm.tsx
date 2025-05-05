
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { UserPlus } from 'lucide-react';
import PassengerForm, { PassengerData } from './PassengerForm';
import { useAuth } from '@/context/AuthContext';

interface MultiPassengerBookingFormProps {
  flightId: string;
  flightDetails: {
    from: string;
    fromCode: string;
    to: string;
    toCode: string;
    departureDate: string;
    departureTime: string;
    arrivalDate: string;
    arrivalTime: string;
    price: number;
  };
  onBookingComplete: () => void;
}

const MultiPassengerBookingForm: React.FC<MultiPassengerBookingFormProps> = ({
  flightId,
  flightDetails,
  onBookingComplete
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [passengers, setPassengers] = useState<PassengerData[]>([
    { firstName: '', lastName: '' } // Start with one passenger
  ]);
  const [isBooking, setIsBooking] = useState(false);

  const handlePassengerChange = (index: number, field: keyof PassengerData, value: string) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = { 
      ...updatedPassengers[index], 
      [field]: value 
    };
    setPassengers(updatedPassengers);
  };

  const addPassenger = () => {
    setPassengers([...passengers, { firstName: '', lastName: '' }]);
  };

  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      const updatedPassengers = passengers.filter((_, i) => i !== index);
      setPassengers(updatedPassengers);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const hasEmptyRequiredFields = passengers.some(
      passenger => !passenger.firstName || !passenger.lastName
    );
    
    if (hasEmptyRequiredFields) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields for all passengers.',
        variant: 'destructive'
      });
      return;
    }
    
    setIsBooking(true);
    
    try {
      // Generate a unique booking ID
      const bookingId = `BK-${Math.floor(Math.random() * 100000)}`;
      const bookingDate = new Date().toISOString().split('T')[0];
      
      // Create booking object
      const bookingDetails = {
        id: bookingId,
        flightId: flightId,
        userId: user?.email || '',
        userName: user?.email || '',
        from: flightDetails.from,
        fromCode: flightDetails.fromCode,
        to: flightDetails.to,
        toCode: flightDetails.toCode,
        departureDate: flightDetails.departureDate,
        departureTime: flightDetails.departureTime,
        arrivalDate: flightDetails.arrivalDate,
        arrivalTime: flightDetails.arrivalTime,
        price: flightDetails.price * passengers.length, // Multiply by passenger count
        status: 'confirmed' as const,
        bookingDate: bookingDate,
        passengers: passengers
      };
      
      // Save to localStorage (in a real app, this would be an API call)
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      localStorage.setItem('bookings', JSON.stringify([...existingBookings, bookingDetails]));
      
      // Deduct from wallet
      const walletInfo = JSON.parse(localStorage.getItem('wallet') || '{"balance": 5000}');
      const updatedWallet = {
        balance: walletInfo.balance - bookingDetails.price,
        transactions: [
          {
            id: `booking-${Date.now()}`,
            amount: bookingDetails.price,
            type: "withdrawal" as const,
            description: `Booking ${bookingId} for ${passengers.length} passenger(s) from ${flightDetails.fromCode} to ${flightDetails.toCode}`,
            date: new Date().toLocaleString('en-US', {
              year: 'numeric', 
              month: '2-digit', 
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })
          },
          ...(walletInfo.transactions || [])
        ]
      };
      localStorage.setItem('wallet', JSON.stringify(updatedWallet));
      
      toast({
        title: 'Booking Successful',
        description: `Your booking for ${passengers.length} passenger(s) has been confirmed. Booking ID: ${bookingId}`
      });
      
      // Reset form and notify parent
      setPassengers([{ firstName: '', lastName: '' }]);
      onBookingComplete();
      
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: 'Booking Failed',
        description: 'There was an error processing your booking. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mb-6">
        <h3 className="font-medium mb-2">Flight Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Flight</p>
            <p className="font-medium">{flightId}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Price per passenger</p>
            <p className="font-medium">₹{(flightDetails.price * 83).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">From</p>
            <p className="font-medium">{flightDetails.from} ({flightDetails.fromCode})</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">To</p>
            <p className="font-medium">{flightDetails.to} ({flightDetails.toCode})</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Departure</p>
            <p className="font-medium">{flightDetails.departureDate} {flightDetails.departureTime}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Arrival</p>
            <p className="font-medium">{flightDetails.arrivalDate} {flightDetails.arrivalTime}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Passenger Details</h2>
          <Button 
            type="button"
            onClick={addPassenger}
            variant="outline"
            size="sm"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Passenger
          </Button>
        </div>
        
        {passengers.map((passenger, index) => (
          <PassengerForm
            key={index}
            passenger={passenger}
            index={index}
            onChange={handlePassengerChange}
            onRemove={removePassenger}
            canRemove={passengers.length > 1}
          />
        ))}
      </div>
      
      <div className="flex flex-col space-y-2 mt-6">
        <div className="flex justify-between items-center py-2 border-t dark:border-gray-700">
          <span className="font-semibold">Total Amount</span>
          <span className="font-bold text-lg text-airline-blue dark:text-airline-lightblue">
            ₹{(flightDetails.price * passengers.length * 83).toFixed(2)}
          </span>
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isBooking}
        >
          {isBooking ? 'Processing...' : `Confirm Booking for ${passengers.length} Passenger${passengers.length > 1 ? 's' : ''}`}
        </Button>
      </div>
    </form>
  );
};

export default MultiPassengerBookingForm;
