
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { PassengerData } from '@/components/bookings/PassengerForm';
import { useAuth } from '@/context/AuthContext';

interface UseBookingFormProps {
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

export const useBookingForm = ({ flightId, flightDetails, onBookingComplete }: UseBookingFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [passengerCount, setPassengerCount] = useState<number>(1);
  const [passengers, setPassengers] = useState<PassengerData[]>([
    { firstName: user?.firstName || '', lastName: user?.lastName || '', gender: 'male', age: 30 }
  ]);
  const [isBooking, setIsBooking] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [walletBalance, setWalletBalance] = useState<number>(0);

  // Fetch wallet balance
  useEffect(() => {
    const walletInfo = JSON.parse(localStorage.getItem('wallet') || '{"balance": 5000}');
    setWalletBalance(walletInfo.balance);
  }, []);

  // Update passenger forms when passenger count changes
  useEffect(() => {
    if (passengerCount > passengers.length) {
      // Add new passenger forms
      const newPassengers = [...passengers];
      for (let i = passengers.length; i < passengerCount; i++) {
        newPassengers.push({ firstName: '', lastName: '', gender: undefined, age: undefined });
      }
      setPassengers(newPassengers);
    } else if (passengerCount < passengers.length) {
      // Remove passenger forms from the end
      setPassengers(passengers.slice(0, passengerCount));
    }
  }, [passengerCount]);

  const handlePassengerChange = (index: number, field: keyof PassengerData, value: string | number) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = { 
      ...updatedPassengers[index], 
      [field]: value 
    };
    setPassengers(updatedPassengers);
    
    // Clear error when field is updated
    if (errors[`passenger-${index}-${field}`]) {
      const newErrors = {...errors};
      delete newErrors[`passenger-${index}-${field}`];
      setErrors(newErrors);
    }
  };

  const addPassenger = () => {
    if (passengers.length < 6) {
      setPassengers([...passengers, { firstName: '', lastName: '', gender: undefined, age: undefined }]);
      setPassengerCount(passengerCount + 1);
    } else {
      toast({
        title: "Maximum Limit Reached",
        description: "You can book for a maximum of 6 passengers at a time.",
        variant: "destructive"
      });
    }
  };

  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      const updatedPassengers = passengers.filter((_, i) => i !== index);
      setPassengers(updatedPassengers);
      setPassengerCount(updatedPassengers.length);
    }
  };

  const validatePassengers = () => {
    const validationErrors: Record<string, string[]> = {};
    let isValid = true;
    
    passengers.forEach((passenger, index) => {
      if (!passenger.firstName) {
        validationErrors[`passenger-${index}-firstName`] = ['First name is required'];
        isValid = false;
      }
      
      if (!passenger.lastName) {
        validationErrors[`passenger-${index}-lastName`] = ['Last name is required'];
        isValid = false;
      }
      
      if (!passenger.gender) {
        validationErrors[`passenger-${index}-gender`] = ['Gender selection is required'];
        isValid = false;
      }
      
      if (!passenger.age || passenger.age <= 0) {
        validationErrors[`passenger-${index}-age`] = ['Valid age is required'];
        isValid = false;
      }
    });
    
    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all passenger details
    if (!validatePassengers()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields for all passengers.",
        variant: "destructive"
      });
      return;
    }
    
    // Calculate total price
    const totalPrice = flightDetails.price * passengers.length;
    
    // Check wallet balance
    if (walletBalance < totalPrice) {
      toast({
        title: "Insufficient Balance",
        description: `Your wallet balance ₹${(walletBalance * 83).toFixed(2)} is insufficient for this booking (₹${(totalPrice * 83).toFixed(2)}).`,
        variant: "destructive"
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
        price: totalPrice,
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
        balance: walletInfo.balance - totalPrice,
        transactions: [
          {
            id: `booking-${Date.now()}`,
            amount: totalPrice,
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
        title: "Booking Successful",
        description: `Your booking for ${passengers.length} passenger(s) has been confirmed. Booking ID: ${bookingId}`
      });
      
      // Reset form and notify parent
      setPassengers([{ firstName: '', lastName: '' }]);
      onBookingComplete();
      
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsBooking(false);
    }
  };

  const totalPrice = flightDetails.price * passengers.length;
  const insufficientBalance = walletBalance < totalPrice;

  return {
    passengerCount,
    setPassengerCount,
    passengers,
    handlePassengerChange,
    addPassenger,
    removePassenger,
    isBooking,
    errors,
    walletBalance,
    totalPrice,
    insufficientBalance,
    handleSubmit
  };
};
