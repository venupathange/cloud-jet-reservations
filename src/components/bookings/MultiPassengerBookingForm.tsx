
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { UserPlus, Users, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import PassengerForm, { PassengerData } from './PassengerForm';
import { useAuth } from '@/context/AuthContext';
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

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
  const [passengerCount, setPassengerCount] = useState<number>(1);
  const [passengers, setPassengers] = useState<PassengerData[]>([
    { firstName: user?.displayName?.split(' ')[0] || '', lastName: user?.displayName?.split(' ')[1] || '', gender: 'male', age: 30 }
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-lg mb-6 shadow-sm">
        <h3 className="font-medium mb-4 text-lg">Flight Details</h3>
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
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Passenger Details</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter details for all passengers (maximum 6)
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-40">
              <Label htmlFor="passenger-count" className="text-sm font-medium mb-1 block">
                Number of Passengers
              </Label>
              <Select 
                value={passengerCount.toString()} 
                onValueChange={(value) => setPassengerCount(parseInt(value))}
              >
                <SelectTrigger id="passenger-count">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Passenger</SelectItem>
                  <SelectItem value="2">2 Passengers</SelectItem>
                  <SelectItem value="3">3 Passengers</SelectItem>
                  <SelectItem value="4">4 Passengers</SelectItem>
                  <SelectItem value="5">5 Passengers</SelectItem>
                  <SelectItem value="6">6 Passengers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              type="button"
              onClick={addPassenger}
              variant="outline"
              size="sm"
              disabled={passengers.length >= 6}
              className="flex items-center mt-6"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add Passenger
            </Button>
          </div>
        </div>
        
        {passengers.map((passenger, index) => (
          <PassengerForm
            key={index}
            passenger={passenger}
            index={index}
            onChange={handlePassengerChange}
            onRemove={removePassenger}
            canRemove={passengers.length > 1}
            isMainPassenger={index === 0}
          />
        ))}
      </div>
      
      {/* Summary Section */}
      <div className="bg-card dark:bg-card-background border rounded-lg p-6 shadow-sm mt-6">
        <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Flight</span>
            <span>{flightId}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Route</span>
            <span>{flightDetails.fromCode} → {flightDetails.toCode}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Date</span>
            <span>{flightDetails.departureDate}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Passengers</span>
            <span className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {passengers.length}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Price per passenger</span>
            <span>₹{(flightDetails.price * 83).toFixed(2)}</span>
          </div>
          
          <div className="border-t pt-3 mt-3 flex justify-between items-center">
            <span className="font-semibold">Total Amount</span>
            <span className="font-bold text-lg text-primary-color">
              ₹{(totalPrice * 83).toFixed(2)}
            </span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">Wallet Balance</span>
            <span className={insufficientBalance ? "text-red-500" : "text-green-600 dark:text-green-400"}>
              ₹{(walletBalance * 83).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      
      {insufficientBalance && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Insufficient Balance</AlertTitle>
          <AlertDescription>
            Your wallet balance is insufficient for this booking. Please add funds to your wallet.
          </AlertDescription>
        </Alert>
      )}
      
      <Button 
        type="submit" 
        className="w-full bg-primary-color hover:bg-primary-color/90"
        disabled={isBooking || insufficientBalance}
      >
        {isBooking ? 'Processing...' : `Confirm Booking for ${passengers.length} Passenger${passengers.length > 1 ? 's' : ''}`}
      </Button>
    </form>
  );
};

export default MultiPassengerBookingForm;
